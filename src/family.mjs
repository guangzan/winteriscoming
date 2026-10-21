import { palette } from "./palette.mjs";
import { syntaxStyle } from "./syntax.mjs";
import { uiStyle } from "./ui.mjs";

export const AUTHOR = "guangzan <guangzan1999@outlook.com>";

export function buildFamily() {
  return {
    $schema: "https://zed.dev/schema/themes/v0.2.0.json",
    name: "Winter is Coming",
    author: AUTHOR,
    themes: [
      {
        name: "Winter is Coming (Dark Blue)",
        appearance: "dark",
        style: {
          ...uiStyle(palette),
          syntax: syntaxStyle(palette, { italics: true }),
        },
      },
      {
        name: "Winter is Coming (Dark Blue) - No Italics",
        appearance: "dark",
        style: {
          ...uiStyle(palette),
          syntax: syntaxStyle(palette, { italics: false }),
        },
      },
    ],
  };
}
