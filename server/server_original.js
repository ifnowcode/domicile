import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Example in-memory data
let posts = [
  { id: 1, title: "Hello World", body: "This is a post." },
  { id: 2, title: "DOMicile Rocks", body: "Metadata-driven UI FTW." }
];

// GET all posts
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

// GET single post
app.get("/api/posts/:id", (req, res) => {
  const post = posts.find(p => p.id === Number(req.params.id));
  if (!post) return res.status(404).json({ error: "Not found" });
  res.json(post);
});

// CREATE post
app.post("/api/posts", (req, res) => {
  const newPost = {
    id: Date.now(),
    title: req.body.title,
    body: req.body.body
  };
  posts.push(newPost);
  res.json(newPost);
});

// UPDATE post
app.put("/api/posts/:id", (req, res) => {
  const idx = posts.findIndex(p => p.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Not found" });

  posts[idx] = { ...posts[idx], ...req.body };
  res.json(posts[idx]);
});

// DELETE post
app.delete("/api/posts/:id", (req, res) => {
  posts = posts.filter(p => p.id !== Number(req.params.id));
  res.json({ success: true });
});

app.listen(3000, () => console.log("API running on http://localhost:3000"));