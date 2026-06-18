import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join } from "node:path";

const root = process.cwd();
const htmlFiles = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full);
    } else if (extname(full) === ".html") {
      htmlFiles.push(full);
    }
  }
}

walk(root);

const missing = [];
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|#)/.test(ref)) continue;
    const target = ref.startsWith("/") ? join(root, ref) : join(dirname(file), ref);
    if (!existsSync(target)) missing.push(`${file} -> ${ref}`);
  }
}

if (missing.length) {
  console.error(missing.join("\n"));
  process.exit(1);
}

console.log(`Checked ${htmlFiles.length} HTML files. All local links resolve.`);
