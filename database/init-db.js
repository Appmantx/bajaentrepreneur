import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, 'baja_knowledge.db');
const db = new Database(dbPath);

console.log('Creating Baja Knowledge Database...');

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Read and execute the SQL file
const sqlFile = join(__dirname, 'init.sql');
const sql = readFileSync(sqlFile, 'utf-8');

// Split by semicolons and execute each statement
const statements = sql.split(';').filter(s => s.trim());

for (const statement of statements) {
  if (statement.trim()) {
    try {
      db.exec(statement);
    } catch (err) {
      // Ignore "already exists" errors
      if (!err.message.includes('already exists')) {
        console.error('Error:', err.message);
      }
    }
  }
}

// Verify tables
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all();
console.log('\nTables created:');
tables.forEach(t => console.log(`  - ${t.name}`));

// Verify agent registrations
const agents = db.prepare('SELECT COUNT(*) as count FROM agent_interactions').get();
console.log(`\nAgents registered: ${agents.count}`);

db.close();
console.log('\nDatabase initialized successfully!');
console.log(`Location: ${dbPath}`);
