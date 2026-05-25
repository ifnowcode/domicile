// setup_db.js
//
// Pure sqlite3 version — no "sqlite" wrapper needed.
// Run with: node setup_db.js

import sqlite3 from "sqlite3";

const db = new sqlite3.Database("contacts.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT
    )
  `);

  db.get("SELECT COUNT(*) AS count FROM contacts", (err, row) => {
    if (err) throw err;

    if (row.count === 0) {
      console.log("Seeding sample contacts...");

      const stmt = db.prepare(`
        INSERT INTO contacts (name, email, phone)
        VALUES (?, ?, ?)
      `);

      stmt.run("Alice Blue", "alice@example.com", "555-1111");
      stmt.run("Bob Green", "bob@example.com", "555-2222");
      stmt.run("Cora Red", "cora@example.com", "555-3333");

      stmt.finalize(() => {
        console.log("Seed data inserted.");
        db.close();
      });
    } else {
      console.log("Contacts table already has data. Skipping seed.");
      db.close();
    }
  });
});
