import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { test } from "node:test";

// Run after npm run build: these checks exercise the deployable site, not config.
test("static homepage contains portfolio content before JavaScript runs", async () => {
  const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
  assert.match(html, /Crafting/);
  assert.match(html, /Digital Chaos/);
  assert.match(html, /Fullstack Developer/);
  for (const section of ["hero", "projects", "skills", "experience", "contact"]) {
    assert.match(html, new RegExp(`id="${section}"`));
  }
  assert.match(html, /<astro-island\b/);
  assert.doesNotMatch(html, /\/_next\//);

  const images = [...html.matchAll(/<img\b[^>]*src="([^"]+)"/g)];
  assert.ok(images.length >= 5, "hero and project images are present");
  for (const [, src] of images) {
    assert.ok(src.startsWith("/projects/"), `local image: ${src}`);
    await access(new URL(`../dist${src}`, import.meta.url));
  }

  const assets = [...html.matchAll(/(?:src|href)="(\/_astro\/[^"?#]+)(?:[^\"]*)"/g)];
  assert.ok(assets.length > 0, "bundled CSS/JavaScript assets are present");
  for (const [, src] of assets) await access(new URL(`../dist${src}`, import.meta.url));
});

test("static deployment includes a custom 404 page", async () => {
  const html = await readFile(new URL("../dist/404.html", import.meta.url), "utf8");
  assert.match(html, /Page not found/);
  assert.match(html, /href="\/"/);
});
