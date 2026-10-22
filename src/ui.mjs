// Zed UI styles for Winter is Coming (Dark Blue).
// Keys follow https://zed.dev/schema/themes/v0.2.0.json plus the
// additional keys Zed accepts for vim mode, minimap, scrollbar and
// version control colors.

export function uiStyle(p) {
  // VS Code leaves editorBracketHighlight.foreground* unset, so it falls back
  // to bracket-pair colorization's native default accents. Mirror those exact
  // defaults in Zed when colorize_brackets is enabled.
  const bracketAccents = ["#ffd700", "#da70d6", "#179fff"];

  return {
    // Window
    "background.appearance": "opaque",
    background: p.editorBackground,
    "surface.background": p.editorBackground,
    "elevated_surface.background": p.surfaceRaised,

    // Borders
    border: "#219fd544",
    "border.variant": p.border,
    "border.focused": p.accent,
    "border.selected": p.accent,
    "border.transparent": "#00000000",
    "border.disabled": p.indentGuide,
    "pane.focused_border": p.accent,
    "pane_group.border": "#219fd544",
    "panel.focused_border": p.accent,

    // Elements
    "element.background": p.surfaceInput,
    "element.hover": "#0e293f",
    "element.active": p.accentDeep,
    "element.selected": p.selection,
    "element.disabled": p.indentGuide,
    "drop_target.background": "#219fd533",
    "ghost_element.background": "#00000000",
    "ghost_element.hover": "#0e293f",
    "ghost_element.active": "#03648a80",
    "ghost_element.selected": "#10336299",
    "ghost_element.disabled": p.indentGuide,

    // Text and icons
    text: p.foreground,
    "text.muted": p.foregroundMuted,
    "text.placeholder": p.foregroundSubtle,
    "text.disabled": p.foregroundDisabled,
    // Zed renders selected status-bar icon buttons with Color::Selected,
    // which resolves to text.accent. Keep it distinct from the status-bar
    // background so active panel icons remain visible.
    "text.accent": p.white,
    icon: p.blueTagSoft,
    "icon.muted": p.foregroundMuted,
    "icon.placeholder": p.foregroundSubtle,
    "icon.disabled": p.foregroundDisabled,
    "icon.accent": p.accent,
    "link_text.hover": p.accentHover,

    // Chrome
    "status_bar.background": p.accent,
    "title_bar.background": p.titleBar,
    "title_bar.inactive_background": p.titleBarInactive,
    "toolbar.background": p.editorBackground,
    "tab_bar.background": p.editorBackground,
    "tab.inactive_background": p.surfaceSunken,
    "tab.active_background": p.surfaceRaised,
    "search.match_background": "#219fd54d",
    "search.active_match_background": "#f7ecb54d",

    // Panels
    "panel.background": p.editorBackground,
    "panel.overlay_background": p.surfaceRaised,
    "panel.indent_guide": p.indentGuide,
    "panel.indent_guide_active": p.accent,
    "panel.indent_guide_hover": p.accent,

    // Scrollbar
    "scrollbar.thumb.background": "#084d8180",
    "scrollbar.thumb.hover_background": "#084d8180",
    "scrollbar.thumb.active_background": "#084d8180",
    "scrollbar.thumb.border": null,
    "scrollbar.track.background": p.editorBackground,
    "scrollbar.track.border": "#219fd522",

    // Minimap
    "minimap.thumb.background": "#219fd533",
    "minimap.thumb.hover_background": "#219fd566",
    "minimap.thumb.active_background": "#219fd599",
    "minimap.thumb.border": null,

    // Editor
    "editor.background": p.editorBackground,
    "editor.foreground": p.editorForeground,
    "editor.gutter.background": p.editorBackground,
    "editor.subheader.background": p.surfaceRaised,
    "editor.active_line.background": "#0c499444",
    "editor.highlighted_line.background": null,
    "editor.line_number": p.accent,
    "editor.active_line_number": p.foreground,
    "editor.invisible": "#3b3a32",
    "editor.wrap_guide": p.indentGuide,
    "editor.active_wrap_guide": p.accent,
    "editor.document_highlight.bracket_background": "#219fd54d",
    "editor.document_highlight.read_background": "#103362cc",
    "editor.document_highlight.write_background": "#103362cc",
    "editor.indent_guide": p.indentGuide,
    "editor.indent_guide_active": p.purple,
    "editor.debugger_active_line.background": "#ffca2812",

    // Terminal
    "terminal.background": p.editorBackground,
    "terminal.ansi.background": p.editorBackground,
    "terminal.foreground": p.foreground,
    "terminal.dim_foreground": p.foregroundSubtle,
    "terminal.bright_foreground": p.white,
    "terminal.ansi.black": p.editorBackground,
    "terminal.ansi.red": p.red,
    "terminal.ansi.green": "#22da6e",
    "terminal.ansi.yellow": p.yellow,
    "terminal.ansi.blue": p.accent,
    "terminal.ansi.magenta": p.purple,
    "terminal.ansi.cyan": "#80cbc4",
    "terminal.ansi.white": p.foreground,
    "terminal.ansi.bright_black": p.foregroundSubtle,
    "terminal.ansi.bright_red": p.redSoft,
    "terminal.ansi.bright_green": p.greenBright,
    "terminal.ansi.bright_yellow": p.orange,
    "terminal.ansi.bright_blue": p.blue,
    "terminal.ansi.bright_magenta": p.purple,
    "terminal.ansi.bright_cyan": p.teal,
    "terminal.ansi.bright_white": p.white,
    "terminal.ansi.dim_black": p.editorBackground,
    "terminal.ansi.dim_red": "#a33c40",
    "terminal.ansi.dim_green": "#5faf68",
    "terminal.ansi.dim_yellow": "#c2b98e",
    "terminal.ansi.dim_blue": "#1a7ea8",
    "terminal.ansi.dim_magenta": "#9b71b8",
    "terminal.ansi.dim_cyan": "#5a9e98",
    "terminal.ansi.dim_white": p.foregroundSubtle,

    // Version control and diagnostics
    conflict: p.yellow,
    "conflict.background": "#f7ecb51f",
    "conflict.border": p.yellow,
    created: p.tealMuted,
    "created.background": "#5abeb01f",
    "created.border": p.tealMuted,
    deleted: p.red,
    "deleted.background": "#ef53501f",
    "deleted.border": p.red,
    hidden: p.foregroundSubtle,
    "hidden.background": p.surfaceRaised,
    "hidden.border": p.foregroundSubtle,
    ignored: p.foregroundDisabled,
    "ignored.background": "#3d5a7026",
    "ignored.border": p.foregroundDisabled,
    modified: p.accent,
    "modified.background": "#219fd51f",
    "modified.border": p.accent,
    predictive: "#4d8aa0",
    "predictive.background": "#0d2137",
    "predictive.border": p.accent,
    renamed: p.blue,
    "renamed.background": "#82aaff1f",
    "renamed.border": p.blue,
    info: p.accent,
    "info.background": "#219fd51f",
    "info.border": p.accent,
    warning: p.yellowBright,
    "warning.background": "#ffca281f",
    "warning.border": p.yellowBright,
    error: p.red,
    "error.background": "#ef53501f",
    "error.border": p.red,
    success: "#22da6e",
    "success.background": "#22da6e1f",
    "success.border": "#22da6e",
    unreachable: "#975f94",
    "unreachable.background": "#975f941f",
    "unreachable.border": "#975f94",
    hint: "#4d8aa0",
    "hint.background": "#0d2137",
    "hint.border": "#4d8aa0",
    "version_control.added": p.tealMuted,
    "version_control.conflict": p.yellow,
    "version_control.conflict_marker.ours": "#5abeb033",
    "version_control.conflict_marker.theirs": "#82aaff33",
    "version_control.deleted": p.red,
    "version_control.ignored": p.foregroundDisabled,
    "version_control.modified": p.accent,
    "version_control.renamed": p.blue,
    "debugger.accent": p.purple,

    // Collaboration cursors
    players: [
      player(p.accent),
      player(p.purple),
      player(p.green),
      player(p.orange),
      player(p.red),
      player(p.teal),
      player(p.blue),
      player(p.pinkSoft),
    ],

    // Bracket pair colorization
    accents: bracketAccents,

    // Vim mode
    "vim.mode.text": p.editorBackground,
    "vim.normal.foreground": p.editorBackground,
    "vim.normal.background": p.accent,
    "vim.helix_normal.foreground": p.editorBackground,
    "vim.helix_normal.background": p.accent,
    "vim.insert.foreground": p.editorBackground,
    "vim.insert.background": p.green,
    "vim.visual.foreground": p.editorBackground,
    "vim.visual.background": p.purple,
    "vim.helix_select.foreground": p.editorBackground,
    "vim.helix_select.background": p.purple,
    "vim.visual_line.foreground": p.editorBackground,
    "vim.visual_line.background": p.purple,
    "vim.visual_block.foreground": p.editorBackground,
    "vim.visual_block.background": p.purpleType,
    "vim.replace.foreground": p.editorBackground,
    "vim.replace.background": p.red,
  };
}

function player(color) {
  return {
    cursor: color,
    selection: `${color}40`,
    background: color,
  };
}
