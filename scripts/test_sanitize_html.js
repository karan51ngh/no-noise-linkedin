import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { main, outputPath, sanitizeHtml } from "./sanitize_html.js";

test("prunes noise and preserves selector attributes", () => {
  const sanitized = sanitizeHtml(`
    <main id="feed" class="stream wide" data-page="2" aria-label="Feed"
          style="display: grid" title="Posts" componentkey="generated" tabindex="0">
      <script>ignore()</script>
      <svg><path d="M0 0" /></svg>
      <img class="avatar" src="data:image/png;base64,AAAA" fetchpriority="high" />
      <iframe src="https://example.com"></iframe>
      <article data-id="42">Hello world</article>
    </main>
  `);

  assert.equal(
    sanitized,
    '<main id="feed" class="stream wide" data-page="2" aria-label="Feed" title="Posts"><img class="avatar"><article data-id="42">Hello world</article></main>',
  );
  assert.equal(outputPath("page.html"), "page.sanitized.html");
  assert.equal(outputPath(), "sanitized.html");
});

test("drops opaque hashed classes and keeps semantic classes", () => {
  assert.equal(
    sanitizeHtml('<div class="_deadbeef product-card"><span class="f81c5aba">Text</span></div>'),
    '<div class="product-card"><span>Text</span></div>',
  );
});

test("CLI writes a separate file and copies its contents", async (context) => {
  const directory = await mkdtemp(join(tmpdir(), "sanitize-html-"));
  context.after(() => rm(directory, { force: true, recursive: true }));
  const source = join(directory, "page.html");
  const expected = '<div id="content">Text</div>';
  await writeFile(source, '<div id="content" style="color:red">Text</div>');

  const originalLog = console.log;
  console.log = () => {};
  try {
    assert.equal(
      await main([source], {
        write: async (value) => assert.equal(value, expected),
      }),
      0,
    );
  } finally {
    console.log = originalLog;
  }

  assert.equal(await readFile(outputPath(source), "utf8"), expected);
});
