import fs from "fs";
import path from "path";
import { marked } from "marked";

// Extract timestamp + title from filename
function parseFilename(filename) {
  // Example: 20260130204559-This_is_my_first_blog.md
  const match = filename.match(/^(\d{14})-(.+)\.md$/);

  if (!match) {
    throw new Error(`Invalid blog filename format: ${filename}`);
  }

  const timestamp = match[1]; // "20260130204559"
  const rawTitle = match[2];  // "This_is_my_first_blog"

  const title = rawTitle.replace(/_/g, " ").trim();

  return { timestamp, title };
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function timestamp() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function renderTemplate(template, data) {
  return template.replace(/{{(.*?)}}/g, (_, key) => {
    const value = data[key.trim()];
    return value !== undefined ? value : "";
  });
}

function formatTimestamp(ts) {
  // ts = "20260130204559"
  const year = ts.slice(0, 4);
  const month = ts.slice(4, 6);
  const day = ts.slice(6, 8);

  return `${month}/${day}/${year}`;
}

function compileDatedTitledMdFilesToHtml(src, out, template) {

  if (!fs.existsSync(out)) {
    fs.mkdirSync(out, { recursive: true });
  }

  const files = fs.readdirSync(src).filter(f => f.endsWith(".md"));

  for (const file of files) {
    const mdPath = path.join(src, file);
    const mdContent = fs.readFileSync(mdPath, "utf8");

    const htmlContent = marked(mdContent);

    const { timestamp, title } = parseFilename(file);
    const fmtTimeStamp = formatTimestamp(timestamp);
    // Inject into template
    /*
    const finalHtml = template
      .replace("{{title}}", title)
      .replace("{{timestamp}}", timestamp)
      .replace("{{content}}", htmlContent);
    */
    const finalHtml = renderTemplate(template, {
      title,
      timestamp,
      content: htmlContent
    });

    // Output filename keeps the timestamp + slug
    const outName = file.replace(".md", ".html");
    const outPath = path.join(out, outName);

    fs.writeFileSync(
      path.join(OUT_DIR, "index.json"),
      JSON.stringify(files.map(f => f.replace(".md", ".html")), null, 2)
    );

    fs.writeFileSync(outPath, finalHtml);

    console.log("Built:", outPath);
  }
}

const SRC_DIR = "src/pages/blog";
const OUT_DIR = "build/blog";
const TEMPLATE = fs.readFileSync("src/templates/layout.html", "utf8");

compileDatedTitledMdFilesToHtml(SRC_DIR, OUT_DIR, TEMPLATE)