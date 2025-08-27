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
                    gold INTEGER DEFAULT 100,
                    completed_quests TEXT DEFAULT '',
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
async function updateCharacterProgress(userId, experience, gold, level) {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE characters 
            SET experience = ?, gold = ?, level = ?, updated_at = CURRENT_TIMESTAMP
            WHERE user_id = ?
        `;
        
        db.run(query, [experience, gold, level, userId], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    });
}

// Complete a quest
async function completeQuest(userId, questId) {
    return new Promise((resolve, reject) => {
        // First get current completed quests
        getCharacter(userId).then(character => {
            const currentQuests = character.completed_quests || '';
            const questList = currentQuests ? currentQuests.split(',') : [];
            
            if (!questList.includes(questId)) {
                questList.push(questId);
            }
            
            const updatedQuests = questList.join(',');
            
            const query = `
                UPDATE characters 
                SET completed_quests = ?, updated_at = CURRENT_TIMESTAMP
                WHERE user_id = ?
            `;
            
            db.run(query, [updatedQuests, userId], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        }).catch(reject);
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
    completeQuest,
    getAllCharacters,
    closeDatabase
};
