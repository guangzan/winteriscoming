# Working on Winter is Coming for Zed

This repository is a theme-only [Zed extension](https://zed.dev/docs/extensions/themes).
`extension.toml` is the manifest, `themes/` is what users install, and `src/` is the
source of truth used to generate the theme family.

## Layout

- `src/palette.mjs` - Winter is Coming (Dark Blue) colors, annotated with the VS Code
  color key each value comes from.
- `src/ui.mjs` - Zed window, panel, editor and terminal colors.
- `src/syntax.mjs` - Tree-sitter capture colors.
- `src/family.mjs` - assembles the theme family consumed by Zed.
- `scripts/build.mjs` - writes `themes/winter-is-coming-dark-blue.json`.
- `scripts/check.mjs` - validates the committed theme, style keys, colors and generator
  consistency. Run it before every commit.

Do not edit `themes/*.json` by hand; edit `src/` and run `npm run build`.

## Commands

```sh
npm run build   # regenerate themes/winter-is-coming-dark-blue.json
npm run check   # validate JSON, style keys, colors and generator output
```

There are no runtime dependencies. Node 20+ is enough.

## Porting rules

- The upstream theme is
  [johnpapa/vscode-winteriscoming](https://github.com/johnpapa/vscode-winteriscoming)
  (MIT). Keep colors traceable to it instead of inventing new ones.
- UI keys that have no VS Code equivalent should be derived from the palette rather
  than hard-coded one-off values.
- VS Code leaves `editorBracketHighlight.foreground*` unset and uses its native
  bracket-pair defaults. Keep Zed's accents aligned with those defaults.
- Theme and author names are user-facing: English only.
- Verify visual changes in Zed, not only with JSON validation.

## Verifying in Zed

1. Open this folder in Zed.
2. Run `zed: install dev extension` (or `zed: reload extensions` when it is already
   installed) and pick this directory.
3. Run `theme selector: toggle` and choose a Winter is Coming theme.
4. Use `dev: open theme preview` and a real source file to check UI and syntax colors.

The extension ID is `winter-is-coming-theme`; it must stay kebab-cased and keep the
`-theme` suffix while publishing to the Zed extension registry.
