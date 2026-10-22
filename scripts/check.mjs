import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { buildFamily } from "../src/family.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const themePath = resolve(root, "themes/winter-is-coming-dark-blue.json");
const schemaPath = resolve(root, "schema/v0.2.0.json");

// Zed accepts these keys even though they are not listed in the published
// v0.2.0 schema. They are used by current theme extensions such as Catppuccin.
const EXTRA_STYLE_KEYS = new Set([
  "debugger.accent",
  "editor.debugger_active_line.background",
  "minimap.thumb.active_background",
  "minimap.thumb.background",
  "minimap.thumb.border",
  "minimap.thumb.hover_background",
  "panel.overlay_background",
  "scrollbar.thumb.active_background",
  "search.active_match_background",
  "version_control.added",
  "version_control.conflict",
  "version_control.conflict_marker.ours",
  "version_control.conflict_marker.theirs",
  "version_control.deleted",
  "version_control.ignored",
  "version_control.modified",
  "version_control.renamed",
  "vim.helix_normal.background",
  "vim.helix_normal.foreground",
  "vim.helix_select.background",
  "vim.helix_select.foreground",
  "vim.insert.background",
  "vim.insert.foreground",
  "vim.mode.text",
  "vim.normal.background",
  "vim.normal.foreground",
  "vim.replace.background",
  "vim.replace.foreground",
  "vim.visual.background",
  "vim.visual.foreground",
  "vim.visual_block.background",
  "vim.visual_block.foreground",
  "vim.visual_line.background",
  "vim.visual_line.foreground",
]);

const errors = [];
const fail = (message) => errors.push(message);
const isColor = (value) => typeof value === "string" && /^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(value);

const schema = JSON.parse(await readFile(schemaPath, "utf8"));
const schemaStyleKeys = new Set(Object.keys(schema.definitions.ThemeStyleContent.properties));
const rawTheme = await readFile(themePath, "utf8");
const family = JSON.parse(rawTheme);

if (family.$schema !== "https://zed.dev/schema/themes/v0.2.0.json") {
  fail("family has an unexpected $schema");
}
if (family.name !== "Winter is Coming") fail("family name must be 'Winter is Coming'");
if (typeof family.author !== "string" || !family.author.includes("@")) {
  fail("family author must contain a name and email");
}
if (!Array.isArray(family.themes) || family.themes.length !== 1) {
  fail(`expected 1 theme, found ${family.themes?.length ?? 0}`);
}

const names = new Set();
for (const theme of family.themes ?? []) {
  if (names.has(theme.name)) fail(`duplicate theme name: ${theme.name}`);
  names.add(theme.name);
  if (theme.appearance !== "dark") fail(`${theme.name}: appearance must be dark`);

  const style = theme.style;
  if (!style || typeof style !== "object") {
    fail(`${theme.name}: missing style`);
    continue;
  }

  for (const [key, value] of Object.entries(style)) {
    if (["accents", "syntax", "players"].includes(key)) continue;
    if (key === "background.appearance") {
      if (!["opaque", "transparent", "blurred"].includes(value)) {
        fail(`${theme.name}: invalid background.appearance '${value}'`);
      }
      continue;
    }
    if (!schemaStyleKeys.has(key) && !EXTRA_STYLE_KEYS.has(key)) {
      fail(`${theme.name}: unknown style key '${key}'`);
    }
    if (value !== null && !isColor(value)) {
      fail(`${theme.name}: style '${key}' is not a color: ${JSON.stringify(value)}`);
    }
  }

  if (!Array.isArray(style.accents) || style.accents.length === 0 || !style.accents.every(isColor)) {
    fail(`${theme.name}: accents must be a non-empty color array`);
  }
  if (style.accents.join() !== "#ffd700,#da70d6,#179fff") {
    fail(`${theme.name}: bracket accents must match VS Code bracket-pair defaults`);
  }
  if (style["text.accent"] === style["status_bar.background"]) {
    fail(`${theme.name}: text.accent must contrast with status_bar.background`);
  }
  if (!Array.isArray(style.players) || !style.players.every((player) =>
    isColor(player.cursor) && isColor(player.selection) && isColor(player.background))) {
    fail(`${theme.name}: players must contain cursor/selection/background colors`);
  }

  const syntax = style.syntax;
  if (!syntax || typeof syntax !== "object" || Object.keys(syntax).length === 0) {
    fail(`${theme.name}: missing syntax styles`);
    continue;
  }
  for (const [capture, rule] of Object.entries(syntax)) {
    if (!isColor(rule.color)) fail(`${theme.name}: syntax '${capture}' has no color`);
    if (![null, "normal", "italic", "oblique"].includes(rule.font_style)) {
      fail(`${theme.name}: syntax '${capture}' has invalid font_style`);
    }
    if (![null, 100, 200, 300, 400, 500, 600, 700, 800, 900].includes(rule.font_weight)) {
      fail(`${theme.name}: syntax '${capture}' has invalid font_weight`);
    }
  }
  const expectedSyntax = {
    constructor: { color: "#a1bde6", font_style: "italic" },
    "keyword.declaration": { color: "#00bff9", font_style: "italic" },
    "keyword.modifier": { color: "#00bff9", font_style: "italic" },
    property: { color: "#7fdbca", font_style: null },
    punctuation: { color: "#bce7ff" },
    "punctuation.bracket": { color: "#ffffff" },
    "punctuation.delimiter": { color: "#bce7ff" },
    "punctuation.special": { color: "#00bff9", font_style: "italic" },
    "string.escape": { color: "#82aaff" },
    "string.regex": { color: "#bcf0c0" },
    "type.builtin": { color: "#7fdbca" },
    "type.class": { color: "#4fb4d8" },
    "type.super": { color: "#4fb4d8" },
    variable: { color: "#d6deeb", font_style: "italic" },
    "variable.declaration": { color: "#d6deeb", font_style: "italic" },
    "variable.member": { color: "#7fdbca", font_style: null },
    "variable.special": { color: "#00bff9", font_style: "italic" },
  };
  for (const [capture, expectedRule] of Object.entries(expectedSyntax)) {
    for (const [property, expectedValue] of Object.entries(expectedRule)) {
      if (syntax[capture]?.[property] !== expectedValue) {
        fail(`${theme.name}: syntax '${capture}' ${property} must be ${expectedValue}`);
      }
    }
  }
}

const expected = `${JSON.stringify(buildFamily(), null, 2)}\n`;
if (rawTheme !== expected) {
  fail("committed theme is out of date; run `npm run build`");
}

const manifest = await readFile(resolve(root, "extension.toml"), "utf8");
for (const key of ["id", "name", "version", "schema_version", "authors", "description", "repository"]) {
  if (!new RegExp(`^${key}\\s*=`, "m").test(manifest)) {
    fail(`extension.toml is missing '${key}'`);
  }
}
const extensionId = manifest.match(/^id\s*=\s*"([^"]+)"/m)?.[1];
if (!extensionId?.endsWith("-theme") || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(extensionId)) {
  fail("extension id must be kebab-cased and end with '-theme'");
}

if (errors.length > 0) {
  console.error(`Theme check failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Theme check passed: ${names.size} theme, ${Object.keys(family.themes[0].style.syntax).length} syntax captures`);
}
