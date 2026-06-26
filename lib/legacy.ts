import fs from "node:fs";
import path from "node:path";

export interface LegacyPageData {
  /** Body inner HTML, with scripts stripped and asset/route paths rewritten. */
  bodyHtml: string;
  /** Script srcs (root-absolute, e.g. "/js/app.js") declared in the source HTML, in order. */
  scripts: string[];
  /** <title> text from the source HTML, if present. */
  title?: string;
  /** meta[name=description] content from the source HTML, if present. */
  description?: string;
}

/**
 * Phase-1 migration helper.
 *
 * Reads one of the original static HTML files at build time and returns its
 * <body> markup (scripts removed) plus the list of scripts it declared.
 * `.html` links are rewritten to clean Next routes ("about.html" -> "/about",
 * "index.html" -> "/") and relative asset paths to root-absolute ("/assets/..").
 *
 * The markup is rendered via dangerouslySetInnerHTML so it is byte-faithful to
 * the original design; the existing vanilla JS (loaded with next/script) wires
 * up all interactivity exactly as before.
 */
export function getLegacyPage(file: string): LegacyPageData {
  const full = path.join(process.cwd(), file);
  const raw = fs.readFileSync(full, "utf8");

  const title = raw.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  const description = raw
    .match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1]
    ?.trim();

  let body = raw.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? raw;

  // Collect external script srcs, then strip all <script> tags.
  const scripts: string[] = [];
  body = body.replace(
    /<script\b[^>]*\bsrc="([^"]+)"[^>]*>\s*<\/script>/gi,
    (_m, src: string) => {
      scripts.push(normalizeAsset(src));
      return "";
    },
  );
  body = body.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");

  // Rewrite "*.html" links (skip anchors, mailto:, tel:, http(s):) to clean routes.
  body = body.replace(
    /(href|src)="([^"#:][^"]*?)\.html"/gi,
    (_m, attr: string, name: string) => {
      const clean = name.replace(/^\.?\//, "");
      const route = clean === "index" ? "/" : "/" + clean;
      return `${attr}="${route}"`;
    },
  );

  // Rewrite relative asset references to root-absolute (served from /public).
  body = body.replace(/(src|href)="assets\//g, '$1="/assets/');
  body = body.replace(/url\((['"]?)assets\//g, "url($1/assets/");

  return { bodyHtml: body.trim(), scripts, title, description };
}

function normalizeAsset(src: string): string {
  if (/^https?:\/\//.test(src)) return src;
  return "/" + src.replace(/^\.?\//, "");
}
