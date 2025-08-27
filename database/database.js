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
                    resolve();
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
    closeDatabase
};
