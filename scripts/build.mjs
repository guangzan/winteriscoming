import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { buildFamily } from "../src/family.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "themes/winter-is-coming-dark-blue.json");

await mkdir(dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(buildFamily(), null, 2)}\n`);
console.log(`wrote ${output}`);
