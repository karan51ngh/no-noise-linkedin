import assert from "node:assert/strict";
import test from "node:test";

import { load } from "cheerio";

import { FILTER_SELECTORS, FILTERED_POST_LABELS } from "../src/services/filterSelectors.js";

test("finds every feed variant and resolves posts without fixed parent depths", () => {
  const $ = load(`
    <main data-testid="mainFeed" data-target="feed-a">
      <div role="listitem" data-target="suggested"><div><span>Suggested</span></div></div>
      <div role="listitem" data-target="promoted"><div><div><div><span>Promoted</span></div></div></div></div>
      <div role="listitem" data-target="activity"><span>From your activity</span></div>
      <div role="listitem" data-decoy><span>A post mentioning Promoted opportunities</span></div>
    </main>
    <main data-finite-scroll-hotkey-context="FEED" data-target="feed-b"></main>
    <main class="scaffold-finite-scroll__content" data-decoy></main>
  `);

  assert.deepEqual(
    $(FILTER_SELECTORS.mainFeed).map((_, element) => $(element).attr("data-target")).get(),
    ["feed-a", "feed-b"],
  );

  const posts = $(FILTER_SELECTORS.mainFeed)
    .find("span")
    .filter((_, element) => Object.values(FILTERED_POST_LABELS).includes($(element).text().trim()))
    .closest(FILTER_SELECTORS.post)
    .map((_, element) => $(element).attr("data-target"))
    .get();

  assert.deepEqual(posts, ["suggested", "promoted", "activity"]);
});

test("selects every post image, including the lead gallery image, but not avatars", () => {
  const $ = load(`
    <main data-testid="mainFeed">
      <img src="https://media.licdn.com/profile-displayphoto-avatar" data-decoy>
      <ul>
        <li><button><figure data-target="lead"><img srcset="https://media.licdn.com/feedshare-lead 1x"></figure></button></li>
        <li><a><figure data-target="second"><img src="https://media.licdn.com/image-shrink_second"></figure></a></li>
      </ul>
      <picture class="vjs-poster"><img src="https://media.licdn.com/ads-video-thumbnail" data-decoy></picture>
    </main>
  `);

  const media = $(FILTER_SELECTORS.mainFeed)
    .find(FILTER_SELECTORS.postImage)
    .closest("figure")
    .map((_, element) => $(element).attr("data-target"))
    .get();

  assert.deepEqual(media, ["lead", "second"]);
  assert.equal($(FILTER_SELECTORS.postImage).filter("[data-decoy]").length, 0);
});

test("does not rely on generated or unsupported selector features", () => {
  const selectors = JSON.stringify(FILTER_SELECTORS);

  assert.doesNotMatch(selectors, /componentkey|#ember\d+|:has\(/i);
});

test("matches semantic feed controls", () => {
  const $ = load(`
    <button data-target="sort"><hr class="feed-index-sort-border"></button>
    <button class="scaffold-finite-scroll__load-button" data-target="load"></button>
    <button data-target="update"><div class="feed-new-update-pill__loader"></div></button>
  `);

  assert.equal($(FILTER_SELECTORS.feedControls.sortMarker).closest("button").attr("data-target"), "sort");
  assert.equal($(FILTER_SELECTORS.feedControls.loadMore).attr("data-target"), "load");
  assert.equal($(FILTER_SELECTORS.feedControls.newUpdate).closest("button").attr("data-target"), "update");
});

test("finds all ad, news, and footer variants without runtime component keys", () => {
  const $ = load(`
    <aside data-target="news-current"><a href="/news/story/example"></a></aside>
    <aside aria-label="LinkedIn News" data-target="news-legacy"></aside>
    <div id="feed-news-module" data-target="news-id"></div>
    <section class="news-module--with-game" data-target="news-game"></section>
    <div class="ad-banner-container" data-target="ad-container"></div>
    <div data-target="ad-wrapper"><iframe title="Advertisement" data-target="ad-frame"></iframe></div>
    <iframe data-testid="preload-frame" data-decoy></iframe>
    <footer data-target="footer-current"><a href="https://about.linkedin.com/"></a></footer>
    <footer data-target="footer-view"><div data-view-name="compact-footer-links"></div></footer>
    <footer data-target="footer-links"><ul class="global-footer-compact__links"></ul></footer>
    <footer data-target="footer-compact"><div id="compactfooter-copyright"></div></footer>
  `);

  assert.deepEqual(
    $(FILTER_SELECTORS.advertisements).map((_, element) => $(element).attr("data-target")).get(),
    ["ad-container", "ad-frame"],
  );
  assert.deepEqual(
    [...new Set($(FILTER_SELECTORS.advertisements).map((_, element) => {
      const target = $(element).closest(".ad-banner-container").get(0) ?? $(element).parent().get(0) ?? element;
      return $(target).attr("data-target");
    }).get())],
    ["ad-container", "ad-wrapper"],
  );
  assert.deepEqual(
    $(FILTER_SELECTORS.newsModule).map((_, element) => $(element).attr("data-target")).get(),
    ["news-legacy", "news-id", "news-game"],
  );
  assert.equal(
    $(FILTER_SELECTORS.newsStoryLink).closest(FILTER_SELECTORS.newsContainer).attr("data-target"),
    "news-current",
  );
  assert.deepEqual(
    $(FILTER_SELECTORS.footerMarkers).closest("footer")
      .map((_, element) => $(element).attr("data-target")).get(),
    ["footer-current", "footer-view", "footer-links", "footer-compact"],
  );
});
