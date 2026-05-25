// generate-barrel.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Folder containing your components
const COMPONENT_DIR = path.join(__dirname, "components");

// Output file
const OUTPUT_FILE = path.join(COMPONENT_DIR, "index.js");

// Read all .js files except index.js
const files = fs.readdirSync(COMPONENT_DIR)
  .filter(f => f.endsWith(".js") && f !== "index.js");

let output = "";

// Generate export lines
for (const file of files) {
  const name = path.basename(file, ".js");
  output += `export { default as ${name} } from "./${file}";\n`;
}

// Write index.js
fs.writeFileSync(OUTPUT_FILE, output);

console.log("Barrel file generated:", OUTPUT_FILE);
