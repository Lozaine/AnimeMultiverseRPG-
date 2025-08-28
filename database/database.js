const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file path
const dbPath = path.join(__dirname, 'characters.db');

// Initialize database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Initialize database tables
async function initializeDatabase() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // Create characters table
            db.run(`
                CREATE TABLE IF NOT EXISTS characters (
                    user_id TEXT PRIMARY KEY,
                    name TEXT NOT NULL,
                    faction TEXT NOT NULL,
                    level INTEGER DEFAULT 1,
                    experience INTEGER DEFAULT 0,
                    xp INTEGER DEFAULT 0,
                    gold INTEGER DEFAULT 100,
                    hp INTEGER DEFAULT 100,
                    max_hp INTEGER DEFAULT 100,
                    atk INTEGER DEFAULT 20,
                    def INTEGER DEFAULT 10,
                    spd INTEGER DEFAULT 15,
                    devil_fruit TEXT,
                    chakra_nature TEXT,
                    cursed_technique TEXT,
                    breathing_style TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `, (err) => {
                if (err) {
                    reject(err);
                } else {
                    // Add columns for existing characters if they don't exist
                    db.run(`ALTER TABLE characters ADD COLUMN hp INTEGER DEFAULT 100`, () => {});
                    db.run(`ALTER TABLE characters ADD COLUMN max_hp INTEGER DEFAULT 100`, () => {});
                    db.run(`ALTER TABLE characters ADD COLUMN atk INTEGER DEFAULT 20`, () => {});
                    db.run(`ALTER TABLE characters ADD COLUMN xp INTEGER DEFAULT 0`, () => {});
                    db.run(`ALTER TABLE characters ADD COLUMN def INTEGER DEFAULT 10`, () => {});
                    db.run(`ALTER TABLE characters ADD COLUMN spd INTEGER DEFAULT 15`, () => {});
                    
                    // Create inventory table
                    db.run(`
                        CREATE TABLE IF NOT EXISTS inventory (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            user_id TEXT NOT NULL,
                            item_name TEXT NOT NULL,
                            item_description TEXT NOT NULL,
                            item_type TEXT NOT NULL,
                            quantity INTEGER DEFAULT 1,
                            obtained_from TEXT DEFAULT 'quest',
                            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                            FOREIGN KEY (user_id) REFERENCES characters (user_id)
                        )
                    `, () => {
                        resolve();
                    });
                }
            });
        });
    });
}

// Create a new character
async function createCharacter(userId, name, faction) {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO characters (user_id, name, faction)
            VALUES (?, ?, ?)
        `;
        
        db.run(query, [userId, name, faction], function(err) {
            if (err) {
                reject(err);
            } else {
                // Return the created character
                getCharacter(userId).then(resolve).catch(reject);
            }
        });
    });
}

// Get character by user ID
async function getCharacter(userId) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM characters WHERE user_id = ?`;
        
        db.get(query, [userId], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

// Update character progress
async function updateCharacterProgress(userId, experience, gold, level, hp = null, maxHp = null, atk = null, def = null, spd = null, xp = null) {
    return new Promise((resolve, reject) => {
        // Build dynamic query based on provided parameters
        let query = `UPDATE characters SET experience = ?, gold = ?, level = ?, updated_at = CURRENT_TIMESTAMP`;
        let params = [experience, gold, level];
        
        if (hp !== null) {
            query += `, hp = ?`;
            params.push(hp);
        }
        if (maxHp !== null) {
            query += `, max_hp = ?`;
            params.push(maxHp);
        }
        if (atk !== null) {
            query += `, atk = ?`;
            params.push(atk);
        }
        if (def !== null) {
            query += `, def = ?`;
            params.push(def);
        }
        if (spd !== null) {
            query += `, spd = ?`;
            params.push(spd);
        }
        if (xp !== null) {
            query += `, xp = ?`;
            params.push(xp);
        }
        
        query += ` WHERE user_id = ?`;
        params.push(userId);
        
        db.run(query, params, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    });
}


// Get all characters (for leaderboards)
async function getAllCharacters() {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM characters ORDER BY level DESC, experience DESC`;
        
        db.all(query, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

// Add item to player inventory
async function addItemToInventory(userId, itemName, itemDescription, itemType, quantity = 1, obtainedFrom = 'quest') {
    return new Promise((resolve, reject) => {
        // First check total inventory count (100 item limit)
        const countQuery = `SELECT SUM(quantity) as total FROM inventory WHERE user_id = ?`;
        
        db.get(countQuery, [userId], (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            
            const currentTotal = result.total || 0;
            
            // Check if item already exists in inventory
            const checkQuery = `SELECT * FROM inventory WHERE user_id = ? AND item_name = ?`;
            
            db.get(checkQuery, [userId, itemName], (err, existingItem) => {
                if (err) {
                    reject(err);
                    return;
                }
                
                if (existingItem) {
                    // Item exists, update quantity (always allow stacking existing items)
                    const updateQuery = `UPDATE inventory SET quantity = quantity + ? WHERE user_id = ? AND item_name = ?`;
                    db.run(updateQuery, [quantity, userId, itemName], function(err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({ updated: true, newQuantity: existingItem.quantity + quantity, inventoryFull: false });
                        }
                    });
                } else {
                    // New item - check inventory limit
                    if (currentTotal + quantity > 100) {
                        resolve({ success: false, message: 'Inventory is full! Maximum 100 items allowed.', inventoryFull: true });
                        return;
                    }
                    
                    // Insert new item
                    const insertQuery = `
                        INSERT INTO inventory (user_id, item_name, item_description, item_type, quantity, obtained_from)
                        VALUES (?, ?, ?, ?, ?, ?)
                    `;
                    db.run(insertQuery, [userId, itemName, itemDescription, itemType, quantity, obtainedFrom], function(err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({ updated: false, newQuantity: quantity, inventoryFull: false });
                        }
                    });
                }
            });
        });
    });
}

// Get player inventory
async function getPlayerInventory(userId) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM inventory WHERE user_id = ? ORDER BY created_at DESC`;
        
        db.all(query, [userId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows || []);
            }
        });
    });
}

// Remove item from inventory (for using items)
async function removeItemFromInventory(userId, itemName, quantity = 1) {
    return new Promise((resolve, reject) => {
        // First check current quantity
        const checkQuery = `SELECT quantity FROM inventory WHERE user_id = ? AND item_name = ?`;
        
        db.get(checkQuery, [userId, itemName], (err, item) => {
            if (err) {
                reject(err);
                return;
            }
            
            if (!item) {
                resolve({ success: false, message: 'Item not found in inventory' });
                return;
            }
            
            if (item.quantity < quantity) {
                resolve({ success: false, message: 'Not enough items in inventory' });
                return;
            }
            
            if (item.quantity === quantity) {
                // Remove item completely
                const deleteQuery = `DELETE FROM inventory WHERE user_id = ? AND item_name = ?`;
                db.run(deleteQuery, [userId, itemName], function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ success: true, remaining: 0 });
                    }
                });
            } else {
                // Reduce quantity
                const updateQuery = `UPDATE inventory SET quantity = quantity - ? WHERE user_id = ? AND item_name = ?`;
                db.run(updateQuery, [quantity, userId, itemName], function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ success: true, remaining: item.quantity - quantity });
                    }
                });
            }
        });
    });
}

// Use player item function
async function usePlayerItem(userId, itemName, quantity = 1) {
    return new Promise(async (resolve, reject) => {
        try {
            // Get character and item data
            const character = await getCharacter(userId);
            const inventory = await getPlayerInventory(userId);
            const item = inventory.find(inv => inv.item_name === itemName);
            
            if (!character) {
                resolve({ success: false, message: 'Character not found!' });
                return;
            }
            
            if (!item) {
                resolve({ success: false, message: `You don't have "${itemName}" in your inventory.` });
                return;
            }
            
            if (item.quantity < quantity) {
                resolve({ success: false, message: `You only have ${item.quantity} of "${itemName}".` });
                return;
            }
            
            // Check if item is usable
            const usableTypes = ['food', 'healing', 'potion', 'consumable'];
            if (!usableTypes.includes(item.item_type)) {
                resolve({ success: false, message: `"${itemName}" cannot be used. It's a ${item.item_type} item.` });
                return;
            }
            
            // Apply item effects
            let effectsApplied = [];
            let newHp = character.hp;
            let newExp = character.experience;
            let newGold = character.gold;
            
            for (let i = 0; i < quantity; i++) {
                // Parse item effects from description
                const description = item.item_description.toLowerCase();
                
                // HP restoration
                if (description.includes('restores') && description.includes('hp')) {
                    const hpMatch = description.match(/restores (\d+) hp/);
                    if (hpMatch) {
                        const hpRestore = parseInt(hpMatch[1]);
                        const oldHp = newHp;
                        newHp = Math.min(newHp + hpRestore, character.max_hp);
                        const actualRestore = newHp - oldHp;
                        if (actualRestore > 0) {
                            effectsApplied.push(`+${actualRestore} HP`);
                        }
                    }
                }
                
                // XP boost
                if (description.includes('xp') || description.includes('experience')) {
                    const xpMatch = description.match(/(\d+) (?:xp|experience)/);
                    if (xpMatch) {
                        const xpGain = parseInt(xpMatch[1]);
                        newExp += xpGain;
                        effectsApplied.push(`+${xpGain} XP`);
                    }
                }
                
                // Gold boost
                if (description.includes('gold') || description.includes('coins')) {
                    const goldMatch = description.match(/(\d+) (?:gold|coins)/);
                    if (goldMatch) {
                        const goldGain = parseInt(goldMatch[1]);
                        newGold += goldGain;
                        effectsApplied.push(`+${goldGain} Gold`);
                    }
                }
            }
            
            // Remove items from inventory
            const removeResult = await removeItemFromInventory(userId, itemName, quantity);
            if (!removeResult.success) {
                resolve({ success: false, message: removeResult.message });
                return;
            }
            
            // Update character stats
            await updateCharacterProgress(userId, newExp, newGold, character.level, newHp);
            
            // Create success message
            let message = '';
            if (effectsApplied.length > 0) {
                message = effectsApplied.join(', ');
            } else {
                message = 'Item used successfully!';
            }
            
            resolve({ success: true, message: message });
            
        } catch (error) {
            reject(error);
        }
    });
}

// Close database connection
function closeDatabase() {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err);
        } else {
            console.log('Database connection closed');
        }
    });
}

module.exports = {
    initializeDatabase,
    createCharacter,
    getCharacter,
    updateCharacterProgress,
    getAllCharacters,
    addItemToInventory,
    getPlayerInventory,
    removeItemFromInventory,
    usePlayerItem,
    closeDatabase
};
