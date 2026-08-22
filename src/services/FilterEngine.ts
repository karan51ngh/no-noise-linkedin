import { type Settings } from "../components/constants";
import { getFirstPathSegment } from "../App";
import { FILTER_SELECTORS, FILTERED_POST_LABELS } from "./filterSelectors.js";

const hiddenFeedTargets = new Set<HTMLElement>();
const hiddenNewsTargets = new Set<HTMLElement>();
const hiddenPostImages = new Set<HTMLElement>();
const hiddenPosts = new Set<HTMLElement>();

function selectAll(selector: string, root: ParentNode = document) {
    return Array.from(root.querySelectorAll<HTMLElement>(selector));
}

function replaceHiddenElements(
    current: Set<HTMLElement>,
    next: Iterable<HTMLElement | null | undefined>
) {
    for (const element of current) element.style.removeProperty('display');
    current.clear();
    for (const element of next) {
        if (!element) continue;
        current.add(element);
        element.style.setProperty('display', 'none', 'important');
    }
}

function getMainFeeds() {
    return selectAll(FILTER_SELECTORS.mainFeed);
}

function toggleHideNewsFeed(toggle: boolean, route: string | null) {
    const targets = new Set<HTMLElement>();

    selectAll(FILTER_SELECTORS.advertisements).forEach((advertisement) => {
        targets.add(
            advertisement.closest<HTMLElement>('.ad-banner-container') ??
            advertisement.parentElement ??
            advertisement
        );
    });

    selectAll(FILTER_SELECTORS.footerMarkers).forEach((marker) => {
        const footer = marker.closest<HTMLElement>('footer');
        if (footer) targets.add(footer);
    });

    if (route === 'feed') {
        selectAll(FILTER_SELECTORS.newsModule).forEach((module) => targets.add(module));
        selectAll(FILTER_SELECTORS.newsStoryLink).forEach((link) => {
            const container = link.closest<HTMLElement>(FILTER_SELECTORS.newsContainer);
            if (container) targets.add(container);
        });
    }

    if (route === 'mynetwork') {
        const logoRow = document.getElementById('linkedin-logo-xxsmall')?.closest<HTMLElement>('div');
        if (logoRow) targets.add(logoRow);
    }

    replaceHiddenElements(hiddenNewsTargets, toggle ? targets : []);
}

function toggleHideMainFeed(toggle: boolean) {
    const targets: (HTMLElement | null)[] = [
        ...getMainFeeds(),
        ...selectAll(FILTER_SELECTORS.feedControls.sortMarker)
            .map((marker) => marker.closest<HTMLElement>('button')),
        ...selectAll(FILTER_SELECTORS.feedControls.loadMore),
        ...selectAll(FILTER_SELECTORS.feedControls.newUpdate)
            .map((control) => control.closest<HTMLElement>('button')),
    ];

    replaceHiddenElements(hiddenFeedTargets, toggle ? targets : []);
}

function toggleHidePostImages(toggle: boolean) {
    const media = getMainFeeds().flatMap((feed) =>
        selectAll(FILTER_SELECTORS.postImage, feed)
            .map((image) => image.closest<HTMLElement>('figure') ?? image)
    );

    replaceHiddenElements(hiddenPostImages, toggle ? media : []);
}

function toggleFilteredPosts(userSettings: Settings) {
    const labelSettings = new Map<string, boolean>([
        [FILTERED_POST_LABELS.suggested, userSettings.disableSuggested],
        [FILTERED_POST_LABELS.promoted, userSettings.disablePromoted],
        [FILTERED_POST_LABELS.fromActivity, userSettings.disableFromActivity],
    ]);
    const posts = new Set<HTMLElement>();

    getMainFeeds().forEach((feed) => {
        selectAll('span', feed).forEach((span) => {
            const shouldHide = labelSettings.get(span.textContent?.trim() ?? '');
            if (!shouldHide) return;

            const post = span.closest<HTMLElement>(FILTER_SELECTORS.post);
            if (post) posts.add(post);
        });
    });

    replaceHiddenElements(hiddenPosts, posts);
}

function purgerLogic(userSettings: Settings) {
    const route = getFirstPathSegment(location.href);

    if (route === 'feed') {
        toggleHideMainFeed(userSettings.disableFeed);
        toggleHidePostImages(userSettings.disableImages);
        toggleFilteredPosts(userSettings);
    }

    if (['feed', 'mynetwork', 'notifications', 'messaging'].includes(route ?? '')) {
        toggleHideNewsFeed(userSettings.disableNews, route);
    }
}

export function initPurger(userSettings: Settings) {
    purgerLogic(userSettings);
    const observer = new MutationObserver(() => purgerLogic(userSettings));

    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['src', 'srcset', 'title'],
        childList: true,
        subtree: true,
    });
    return () => observer.disconnect();
}
