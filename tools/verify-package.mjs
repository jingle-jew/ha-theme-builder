import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const hacs = JSON.parse(await readFile(path.join(ROOT, "hacs.json"), "utf8"));
const manifest = JSON.parse(await readFile(path.join(ROOT, "custom_components", "ha_theme_builder", "manifest.json"), "utf8"));
const frontend = path.join(ROOT, "custom_components", "ha_theme_builder", "frontend", "ha-theme-builder.js");
const frontendSize = (await stat(frontend)).size;

if (hacs.zip_release !== true || hacs.filename !== "ha-theme-builder-hacs.zip") {
  throw new Error("hacs.json must point to the generated HACS release asset.");
}
if (manifest.domain !== "ha_theme_builder" || manifest.config_flow !== true) {
  throw new Error("Integration manifest is missing its domain or config flow.");
}
if (frontendSize < 100_000) {
  throw new Error(`Bundled frontend looks incomplete (${frontendSize} bytes).`);
}

console.log(`Package contract verified; bundled frontend is ${frontendSize} bytes.`);
