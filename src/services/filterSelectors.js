export const FILTER_SELECTORS = {
    advertisements: '.ad-banner-container, iframe[title="advertisement" i]',
    feedControls: {
        loadMore: '.scaffold-finite-scroll__load-button',
        newUpdate: '.feed-new-update-pill__new-update-button, .feed-new-update-pill__loader',
        sortMarker: 'hr.feed-index-sort-border',
    },
    footerMarkers:
        'footer [data-view-name^="compact-footer-"], footer a[href*="about.linkedin.com"], ' +
        'footer .global-footer-compact__links, footer #compactfooter-copyright',
    mainFeed: '[data-testid="mainFeed"], [data-finite-scroll-hotkey-context="FEED"]',
    newsContainer: 'section, aside',
    newsModule: '#feed-news-module, .news-module--with-game, aside[aria-label="LinkedIn News"]',
    newsStoryLink: 'a[href*="/news/story/"]',
    post: '[role="listitem"]',
    postImage:
        'img[src*="feedshare-"], img[src*="image-shrink_"], ' +
        'img[srcset*="feedshare-"], img[srcset*="image-shrink_"]',
};

export const FILTERED_POST_LABELS = {
    fromActivity: 'From your activity',
    promoted: 'Promoted',
    suggested: 'Suggested',
};
