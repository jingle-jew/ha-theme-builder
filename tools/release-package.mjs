import { cp, mkdir, readdir, rm, stat } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const INTEGRATION = path.join(ROOT, "custom_components", "ha_theme_builder");
const DIST = path.join(ROOT, "dist");
const HACS_STAGE = path.join(DIST, "hacs-stage");
const MANUAL_STAGE = path.join(DIST, "manual-stage");
const HACS_ZIP = path.join(DIST, "ha-theme-builder-hacs.zip");
const MANUAL_ZIP = path.join(DIST, "ha-theme-builder.zip");

async function filesBelow(root, prefix = "") {
  const entries = await readdir(root, { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.name === "__pycache__" || entry.name.endsWith(".pyc")) continue;
    const relative = path.join(prefix, entry.name);
    if (entry.isDirectory()) files.push(...await filesBelow(path.join(root, entry.name), relative));
    else files.push(relative);
  }
  return files;
}

function zip(root, destination, entries) {
  const result = spawnSync("zip", ["-q", "-X", destination, ...entries], { cwd: root, encoding: "utf8" });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(result.stderr || result.stdout || `zip exited with ${result.status}`);
}

await rm(HACS_STAGE, { recursive: true, force: true });
await rm(MANUAL_STAGE, { recursive: true, force: true });
await rm(HACS_ZIP, { force: true });
await rm(MANUAL_ZIP, { force: true });
await mkdir(HACS_STAGE, { recursive: true });
await cp(INTEGRATION, HACS_STAGE, { recursive: true, filter: (source) => !source.includes("__pycache__") && !source.endsWith(".pyc") });

const integrationFiles = await filesBelow(HACS_STAGE);
zip(HACS_STAGE, HACS_ZIP, integrationFiles);

const manualStage = path.join(MANUAL_STAGE, "custom_components", "ha_theme_builder");
await mkdir(path.dirname(manualStage), { recursive: true });
await cp(HACS_STAGE, manualStage, { recursive: true });
const manualFiles = await filesBelow(MANUAL_STAGE);
zip(MANUAL_STAGE, MANUAL_ZIP, manualFiles);

console.log(`Created ${path.relative(ROOT, HACS_ZIP)} (${(await stat(HACS_ZIP)).size} bytes).`);
console.log(`Created ${path.relative(ROOT, MANUAL_ZIP)} (${(await stat(MANUAL_ZIP)).size} bytes).`);
