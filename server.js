const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// In-memory storage for names
let names = [];

// API Routes

// Get all names (admin only)
app.get("/api/names", (req, res) => {
  res.json(names);
});

// Get a single name by ID (public - for users to access their own)
app.get("/api/names/:id", (req, res) => {
  const { id } = req.params;
  const name = names.find((n) => n.id === id);

  if (!name) {
    return res.status(404).json({ error: "Name not found" });
  }

  res.json(name);
});

// Add a name (public)
app.post("/api/names", (req, res) => {
  const { name } = req.body;
  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "Name is required" });
  }

  const newName = {
    id: Date.now().toString(),
    name: name.trim(),
    createdAt: new Date().toISOString(),
  };

  names.push(newName);
  res.json(newName);
});

// Update a name (public - users can edit their own, admin can edit any)
app.put("/api/names/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "Name is required" });
  }

  const index = names.findIndex((n) => n.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Name not found" });
  }

  names[index].name = name.trim();
  res.json(names[index]);
});

// Delete all names (admin only) - must come before /api/names/:id
app.delete("/api/names", (req, res) => {
  const count = names.length;
  names = [];
  res.json({ message: "All names deleted", count });
});

// Delete a name (admin only)
app.delete("/api/names/:id", (req, res) => {
  const { id } = req.params;
  const index = names.findIndex((n) => n.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Name not found" });
  }

  names.splice(index, 1);
  res.json({ message: "Name deleted" });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`Access the public page at http://YOUR_IP:${PORT}`);
  console.log(`Access the admin page at http://YOUR_IP:${PORT}/admin.html`);
});
