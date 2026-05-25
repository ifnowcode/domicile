// server.js
//
// Express API using sqlite3 (no better-sqlite3, no sqlite wrapper)

import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Open the database
const db = new sqlite3.Database("contacts.db");

// GET all contacts
app.get("/api/contacts", (req, res) => {
  db.all("SELECT * FROM contacts", (err, rows) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(rows);
  });
});

// GET one contact
app.get("/api/contacts/:id", (req, res) => {
  db.get("SELECT * FROM contacts WHERE id = ?", [req.params.id], (err, row) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  });
});

// POST create contact
app.post("/api/contacts", (req, res) => {
  const { name, email, phone } = req.body;

  const stmt = db.prepare(
    "INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)"
  );

  stmt.run([name, email, phone], function (err) {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ id: this.lastID });
  });

  stmt.finalize();
});

// DELETE contact
app.delete("/api/contacts/:id", (req, res) => {
  db.run("DELETE FROM contacts WHERE id = ?", [req.params.id], function (err) {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ success: true });
  });
});

// Start server
app.listen(3000, () => {
  console.log("API running at http://localhost:3000");
});
