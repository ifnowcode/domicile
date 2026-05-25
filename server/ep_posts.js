import express from "express"; 
const router = express.Router();

// Example in-memory data
let posts = [
  { id: 1, title: "Hello World", body: "This is a post." },
  { id: 2, title: "DOMicile Rocks", body: "Metadata-driven UI FTW." },
  { id: 3, title: "Testing 1, 2, 3", body: "This is a test." },
];

// GET all posts
router.get("/", (req, res) => {
  res.json(posts);
});

// GET single post
router.get("/:id", (req, res) => {
  const post = posts.find(p => p.id === Number(req.params.id));
  if (!post) return res.status(404).json({ error: "Not found" });
  res.json(post);
});

// CREATE post
router.post("/", (req, res) => {
  const newPost = {
    id: Date.now(),
    title: req.body.title,
    body: req.body.body
  };
  posts.push(newPost);
  res.json(newPost);
});

// UPDATE post
router.put("/:id", (req, res) => {
  const idx = posts.findIndex(p => p.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Not found" });

  posts[idx] = { ...posts[idx], ...req.body };
  res.json(posts[idx]);
});

// DELETE post
router.delete("/:id", (req, res) => {
  posts = posts.filter(p => p.id !== Number(req.params.id));
  res.json({ success: true });
});

export default router;