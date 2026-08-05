// node server.js
import express from "express";
import cors from "cors";
import postRouter from "./ep_posts.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve static pages from /public
app.use(express.static(path.join(__dirname, "public")));

// Mount JSON API
app.use("/api/posts", postRouter);

// Optional: redirect /api to /api.html
app.get("/api", (req, res) => {
  res.sendFile(path.join(__dirname, "public/api.html"));
});

// Optional: override root to serve index.html explicitly
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "public/domicile.html"));
});

app.get("/test2", (req, res) => {
  let html= "Hola!";

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>DOMicile SSR Test</title>
    </head>
    <body>
      ${html}
    </body>
    </html>
  `);
});

app.get("/test3", (req, res) => {
  let html= "Fuck!";

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>DOMicile SSR Test</title>
    </head>
    <body>
      ${html}
    </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
