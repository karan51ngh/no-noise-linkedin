import { type Settings } from "./src/content-script/constants";
import { getFirstPathSegment } from "./src/content-script/App";

const DEV_LOGS = false;

const promotedPosts: (HTMLElement | null)[] = [];
const suggestedPosts: (HTMLElement | null)[] = [];

function toggleHidePromoted(toggle: boolean) {
    promotedPosts.forEach((pp) => {
        if (!pp) return;
        if (toggle) {
            // Hide the element
            pp.style.setProperty('display', 'none', 'important');
        } else {
            // Unhide (restore original display)
            pp.style.removeProperty('display');
        }
    })
}

function toggleHideSuggested(toggle: boolean) {
    suggestedPosts.forEach((sp) => {
        if (!sp) return;
        if (toggle) {
            sp.style.setProperty('display', 'none', 'important');
        } else {
            sp.style.removeProperty('display');
        }
    })
}

function toggleHideNewsFeed(toggle: boolean) {

    if (["feed"].includes(getFirstPathSegment(location.href) as string)) {

        const newsModule =
            (document.querySelector('#feed-news-module.news-module--with-game') as HTMLElement | null) ||
            (document.getElementById('feed-news-module') as HTMLElement | null) ||
            (document.querySelector('.news-module--with-game') as HTMLElement | null);

        const newsAside =
            (document.querySelector('aside.scaffold-layout__aside[aria-label="LinkedIn News"]') as HTMLElement | null) ||
            (document.querySelector('aside[aria-label="LinkedIn News"]') as HTMLElement | null);

        if (toggle) {
            newsModule?.style.setProperty('display', 'none', 'important');
            newsAside?.style.setProperty('display', 'none', 'important');
        } else {
            newsModule?.style.removeProperty('display');
            newsAside?.style.removeProperty('display');
        }
    }

    if (["mynetwork"].includes(getFirstPathSegment(location.href) as string)) {

        const myNetworkAdSection =
            (document.querySelector('iframe[title="advertisement"][componentkey*="mynetwork"]')?.closest('section') as HTMLElement | null) ||
            (document.querySelector('iframe[title="advertisement"]')?.closest('section') as HTMLElement | null) ||
            (document.querySelector('iframe[title="advertisement"]')?.parentElement as HTMLElement | null);

        const myNetworkFooter =
            (document.querySelector('[data-view-name^="compact-footer-"]')?.closest('footer') as HTMLElement | null) ||
            (document.querySelector('footer [data-view-name^="compact-footer-"]')?.closest('footer') as HTMLElement | null);

        const myNetworkFooterLogoRow =
            (document.querySelector('svg#linkedin-logo-xxsmall')?.closest('div') as HTMLElement | null) ||
            (document.getElementById('linkedin-logo-xxsmall')?.closest('div') as HTMLElement | null);

        if (toggle) {
            myNetworkAdSection?.style.setProperty('display', 'none', 'important');
            myNetworkFooter?.style.setProperty('display', 'none', 'important');
            myNetworkFooterLogoRow?.style.setProperty('display', 'none', 'important');
        } else {
            myNetworkAdSection?.style.removeProperty('display');
            myNetworkFooter?.style.removeProperty('display');
            myNetworkFooterLogoRow?.style.removeProperty('display');
        }
    }

    if (["messaging", "notifications"].includes(getFirstPathSegment(location.href) as string)) {

        const newsModule =
            (document.querySelector('aside.scaffold-layout__aside section.ad-banner-container') as HTMLElement | null) ||
            (document.querySelector('aside.scaffold-layout__aside .ad-banner-container') as HTMLElement | null) ||
            (document.querySelector('section.ad-banner-container') as HTMLElement | null);

        const footerLinks =
            (document.querySelector('ul.global-footer-compact__links') as HTMLElement | null) ||
            (document.querySelector('.global-footer-compact__links') as HTMLElement | null);

        const footerCopyright =
            (document.getElementById('compactfooter-copyright') as HTMLElement | null) ||
            (document.querySelector('#compactfooter-copyright.global-footer-compact__content') as HTMLElement | null);

        if (toggle) {
            newsModule?.style.setProperty('display', 'none', 'important');
            footerLinks?.style.setProperty('display', 'none', 'important');
            footerCopyright?.style.setProperty('display', 'none', 'important');
        } else {
            newsModule?.style.removeProperty('display');
            footerLinks?.style.removeProperty('display');
            footerCopyright?.style.removeProperty('display');
        }
    }
}

function toggleHideMainFeed(toggle: boolean) {
    const mainFeed =
        (document.querySelector('div.scaffold-finite-scroll__content[data-finite-scroll-hotkey-context="FEED"]') as HTMLElement | null) ||
        (document.querySelector('[data-finite-scroll-hotkey-context="FEED"]') as HTMLElement | null) ||
        (document.querySelector('.scaffold-finite-scroll__content') as HTMLElement | null);

    const mainFeedSortButton =
        (document.querySelector('button.artdeco-dropdown__trigger:has(> hr.feed-index-sort-border)') as HTMLElement | null) ||
        (document.querySelector('hr.feed-index-sort-border')?.closest('button') as HTMLElement | null) ||
        (document.querySelector('button.artdeco-dropdown__trigger.full-width[aria-expanded][type="button"]') as HTMLElement | null);

    const loadMoreButton =
        (document.querySelector('button.scaffold-finite-scroll__load-button') as HTMLElement | null) ||
        (document.querySelector('button.artdeco-button.scaffold-finite-scroll__load-button') as HTMLElement | null) ||
        (document.getElementById('ember322') as HTMLElement | null);

    const newUpdatePillButton =
        (document.querySelector('button.feed-new-update-pill__new-update-button') as HTMLElement | null) ||
        (document.querySelector('div.feed-new-update-pill__loader')?.closest('button') as HTMLElement | null) ||
        (document.querySelector('button.artdeco-button.feed-new-update-pill__new-update-button') as HTMLElement | null);

    if (toggle) {
        mainFeed?.style.setProperty('display', 'none', 'important');
        mainFeedSortButton?.style.setProperty('display', 'none', 'important');
        loadMoreButton?.style.setProperty('display', 'none', 'important');
        newUpdatePillButton?.style.setProperty('display', 'none', 'important');
    } else {
        mainFeed?.style.removeProperty('display');
        mainFeedSortButton?.style.removeProperty('display');
        loadMoreButton?.style.removeProperty('display');
        newUpdatePillButton?.style.removeProperty('display');
    }
}

function deleteUnwantedSpans(type: string, element: HTMLElement | null, count: number) {
    if ((type === 'suggested' && count === 7) || (type === 'promoted' && count === 9)) {
        DEV_LOGS && console.log("Unwanted Post Detected")

        type === 'suggested'
            ? suggestedPosts.push(element)
            : promotedPosts.push(element)
        return;
    }
    else {
        deleteUnwantedSpans(type, element?.parentNode as HTMLElement, count + 1);
    }
}

function findUnwantedSpans(userSettings: Settings) {
    console.log("findUnwantedSpans() triggered")
    const suggestedSpans = Array.from(document.getElementsByTagName("span"))
        .filter((span) => {
            if (span.innerHTML.includes("Suggested")) {
                DEV_LOGS && console.log("Suggested post detected.")
                return true;
            }
        });

    const promotedSpans = Array.from(document.getElementsByTagName("span"))
        .filter((span) => {
            if (span.innerHTML.includes("Promoted")) {
                DEV_LOGS && console.log("Promoted post detected.")
                return true;
            }
        });

    suggestedSpans.forEach((s) => {
        deleteUnwantedSpans('suggested', s, 0);
    })
    toggleHideSuggested(userSettings.disableSuggested);

    promotedSpans.forEach((s) => {
        deleteUnwantedSpans('promoted', s, 0);
    })
    toggleHidePromoted(userSettings.disablePromoted);

}

function purgerLogic(userSettings: Settings) {
    if (["feed"].includes(getFirstPathSegment(location.href) as string)) {
        toggleHideMainFeed(userSettings.disableFeed);
        findUnwantedSpans(userSettings);
    }

    if (["feed", "mynetwork", "notifications", "messaging"].includes(getFirstPathSegment(location.href) as string)) {
        toggleHideNewsFeed(userSettings.disableNews);
    }

}

export function initPurger(userSettings: Settings) {

    purgerLogic(userSettings)
    const observer = new MutationObserver(() => {
        DEV_LOGS && console.log("mutation occurred");
        purgerLogic(userSettings)
    });

    observer.observe(document.body, { childList: true, subtree: true });

}
