#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { basename, dirname, extname, join } from "node:path";
import { parseArgs } from "node:util";
import { pathToFileURL } from "node:url";

import { load } from "cheerio";

const REMOVED_TAGS = "svg, script, style, path, noscript, iframe";
const RUNTIME_ATTRIBUTES = ["componentkey", "tabindex", "fetchpriority"];
const DATA_IMAGE = /data:image\/(?:base64|[^;,]+;base64)/i;
const HASHED_CLASS = /^_?[a-f0-9]{8}$/i;

export function sanitizeHtml(rawHtml) {
  const $ = load(rawHtml, null, false);

  $(REMOVED_TAGS).remove();
  $("*").each((_, element) => {
    const node = $(element);
    node.removeAttr("style");
    for (const attribute of RUNTIME_ATTRIBUTES) node.removeAttr(attribute);

    const src = node.attr("src");
    if (src && DATA_IMAGE.test(src)) node.removeAttr("src");

    const classes = (node.attr("class") ?? "").split(/\s+/).filter((name) => name && !HASHED_CLASS.test(name));
    if (classes.length) node.attr("class", classes.join(" "));
    else node.removeAttr("class");
  });

  return $.html().replace(/>\s+</g, "><").trim();
}

export function outputPath(inputPath) {
  if (!inputPath) return "sanitized.html";
  const extension = extname(inputPath);
  return join(dirname(inputPath), `${basename(inputPath, extension)}.sanitized.html`);
}

function clipboardCommand(action) {
  if (process.platform === "darwin") return [action === "read" ? "pbpaste" : "pbcopy", []];
  if (process.platform === "win32") {
    return [
      "powershell.exe",
      [
        "-NoProfile",
        "-Command",
        action === "read" ? "Get-Clipboard -Raw" : "[Console]::In.ReadToEnd() | Set-Clipboard",
      ],
    ];
  }
  if (process.env.WAYLAND_DISPLAY) return [action === "read" ? "wl-paste" : "wl-copy", []];
  return ["xclip", ["-selection", "clipboard", ...(action === "read" ? ["-o"] : [])]];
}

const systemClipboard = {
  read() {
    const [command, args] = clipboardCommand("read");
    return execFileSync(command, args, { encoding: "utf8" });
  },
  write(value) {
    const [command, args] = clipboardCommand("write");
    execFileSync(command, args, { input: value });
  },
};

export async function main(argv = process.argv.slice(2), clipboard = systemClipboard) {
  try {
    const { values, positionals } = parseArgs({
      args: argv,
      allowPositionals: true,
      options: {
        help: { type: "boolean", short: "h" },
      },
    });

    if (values.help) {
      console.log("Usage: node sanitize_html.js [HTML_FILE]");
      return 0;
    }
    if (positionals.length > 1) throw new Error("expected at most one HTML file");

    const inputPath = positionals[0];
    const rawHtml = inputPath ? await readFile(inputPath, "utf8") : await clipboard.read();
    const sanitized = sanitizeHtml(rawHtml);

    await writeFile(outputPath(inputPath), sanitized, "utf8");
    console.log(sanitized);
    await clipboard.write(sanitized);
    return 0;
  } catch (error) {
    console.error(`Error processing HTML: ${error.message}`);
    return 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exitCode = await main();
}
