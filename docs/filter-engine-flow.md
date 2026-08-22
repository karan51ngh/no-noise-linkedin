# Filter engine flow

This page maps the current implementation of [`FilterEngine.ts`](../src/services/FilterEngine.ts) and its selector definitions in [`filterSelectors.js`](../src/services/filterSelectors.js).

## System boundary

The filter engine runs as a content script. It does not remove nodes, intercept requests, or rewrite LinkedIn data. It finds matching elements in the current document and either:

- hides them with inline `display: none !important`; or
- unhides them by removing the inline `display` property.

The engine consumes six boolean [`Settings`](../src/components/constants.ts) fields:

| Setting | Default | Switch | Route | Effect |
| --- | ---: | --- | --- | --- |
| `disableFeed` | `false` | `#nnl-feed` | `/feed` | Hides every recognized main-feed root and feed control. |
| `disablePromoted` | `true` | `#nnl-promoted` | `/feed` | Hides posts whose label is exactly `Promoted`. |
| `disableSuggested` | `true` | `#nnl-suggested` | `/feed` | Hides posts whose label is exactly `Suggested`. |
| `disableFromActivity` | `true` | `#nnl-from-activity` | `/feed` | Hides posts whose label is exactly `From your activity`. |
| `disableImages` | `false` | `#nnl-images` | `/feed` | Hides feed images while leaving post text visible. |
| `disableNews` | `true` | `#nnl-news` | `/feed`, `/mynetwork`, `/notifications`, `/messaging` | Hides recognized news, ad, and footer elements. |

The `theme` setting is not consumed by the filter engine.

## Execution flow

1. [`src/index.tsx`](../src/index.tsx) mounts `App` in a shadow root.
2. `App` reads settings from `chrome.storage` and calls `initPurger(userSettings)` from an effect.
3. `initPurger` runs one filtering pass and observes descendant child-list mutations plus `src`, `srcset`, and `title` changes on `document.body`.
4. Each mutation reruns the filter against the current URL and current DOM.
5. When settings change or `App` unmounts, the effect cleanup disconnects the previous observer.

Other attribute and text changes are processed only when an observed mutation also causes a pass.

`purgerLogic` dispatches by the first non-empty URL path segment:

| Segment | Feed roots and controls | Labeled posts | Images | News, ads, and footers |
| --- | ---: | ---: | ---: | ---: |
| `feed` | Yes | Yes | Yes | Yes |
| `mynetwork` | No | No | No | Yes |
| `notifications` | No | No | No | Yes |
| `messaging` | No | No | No | Yes |
| Any other value or `null` | No | No | No | No |

## Selection model

`selectAll` wraps `querySelectorAll`, so every matching element is processed. Comma-separated selectors describe supported DOM variants; they are not ordered fallbacks. Route targets and matched posts use `Set` or `Map` collections to avoid duplicate writes.

### Main feed and controls

Every matching main-feed root is selected with:

```css
[data-testid="mainFeed"], [data-finite-scroll-hotkey-context="FEED"]
```

This root set scopes post-label and image searches. Focus Mode also hides all roots plus these controls:

| Control | Marker selector | Hidden target |
| --- | --- | --- |
| Sort | `hr.feed-index-sort-border` | Closest `button` |
| Load more | `.scaffold-finite-scroll__load-button` | Matching element |
| New update | `.feed-new-update-pill__new-update-button, .feed-new-update-pill__loader` | Closest `button` |

Missing markers and markers without the required ancestor are ignored.

### Labeled posts

Within each main-feed root, the engine queries all `span` elements and compares `span.textContent.trim()` with the three exact labels:

- `Suggested`
- `Promoted`
- `From your activity`

A matching label resolves its post through `closest('[role="listitem"]')`. A `Set` deduplicates posts. If one post contains more than one recognized label, it remains hidden when any associated setting is enabled.

### Feed images

Within each main-feed root, No Image Mode queries all images matching:

```css
img[src*="feedshare-"], img[src*="image-shrink_"],
img[srcset*="feedshare-"], img[srcset*="image-shrink_"]
```

It hides the closest `figure` when present, otherwise the image itself. Querying all matches includes the lead image and every later image in a multi-image post while excluding unrelated images such as avatars.

## News, ad, and footer targets

On every supported route, the engine queries all recognized ad and footer variants.

### Advertisements

```css
.ad-banner-container, iframe[title="advertisement" i]
```

For each match, the closest `.ad-banner-container` is hidden when present; otherwise the iframe's immediate wrapper is hidden. The case-insensitive title selector accepts capitalization variants such as `Advertisement`.

### Footer markers

```css
footer [data-view-name^="compact-footer-"],
footer a[href*="about.linkedin.com"],
footer .global-footer-compact__links,
footer #compactfooter-copyright
```

Each marker resolves through `closest('footer')`, so the whole containing footer is toggled once.

### Feed-only news variants

The engine toggles every direct news-module match:

```css
#feed-news-module, .news-module--with-game, aside[aria-label="LinkedIn News"]
```

It also queries every `a[href*="/news/story/"]` and toggles the nearest containing `section` or `aside`.

### My Network logo row

On `/mynetwork`, the engine additionally finds `#linkedin-logo-xxsmall` and toggles its closest `div`.

## State and lifecycle semantics

- Each pass queries the current DOM; small sets retain only currently hidden feed, post, image, and news/ad targets so recycled elements can be unhidden before the next result set is applied.
- `Set` and `Map` collections prevent duplicate writes within one pass.
- Each `initPurger` call returns a cleanup function that disconnects its observer.
- The observer reads the current `location.href`, so a mutation after SPA navigation uses the current route.
- `App` separately polls the URL and listens for `popstate` and `hashchange`; its reload behavior is outside `FilterEngine.ts`.

## Failure and no-op behavior

- An invalid URL makes `getFirstPathSegment` log `Invalid URL provided` and return `null`; the dispatcher then makes no DOM changes.
- A selector with no matches is a no-op.
- A label must match after trimming and is case-sensitive; localized or changed labels do not match.
- A matching label without a `[role="listitem"]` ancestor is ignored.
- Unhiding removes `display`; it does not restore a display value overwritten before the engine ran.

## Verification

- `npm test` runs the selector and sanitizer test suites.
- `node --test scripts/test_filter_selectors.js` runs only selector regression tests.
- `npm run test:sanitize-html` runs only sanitizer tests.
- `npm run build` type-checks and builds the Chromium extension.
- `npm run build:firefox` type-checks and builds the Firefox extension.
