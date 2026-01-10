import { type Settings } from "./src/content-script/constants";

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

    const newsModule =
        (document.querySelector('#feed-news-module.news-module--with-game') as HTMLElement | null) ||
        (document.getElementById('feed-news-module') as HTMLElement | null) ||
        (document.querySelector('.news-module--with-game') as HTMLElement | null);

    const stickyContent =
        (document.querySelector('div:has(> section.ad-banner-container)') as HTMLElement | null) ||
        (document.querySelector('section.ad-banner-container')?.closest('div') as HTMLElement | null) ||
        (document.querySelector('.scaffold-layout__sticky-content') as HTMLElement | null);


    if (!newsModule) return;
    if (toggle) {
        newsModule.style.setProperty('display', 'none', 'important');
        stickyContent?.style.setProperty('display', 'none', 'important');
    } else {
        newsModule.style.removeProperty('display');
        stickyContent?.style.removeProperty('display');
    }
}

function toggleHideMainFeed(toggle: boolean) {
    const mainFeed =
        (document.querySelector('div.scaffold-finite-scroll__content[data-finite-scroll-hotkey-context="FEED"]') as HTMLElement | null) ||
        (document.querySelector('[data-finite-scroll-hotkey-context="FEED"]') as HTMLElement | null) ||
        (document.querySelector('.scaffold-finite-scroll__content') as HTMLElement | null);

    if (!mainFeed) return;

    if (toggle) {
        mainFeed.style.setProperty('display', 'none', 'important');
    } else {
        mainFeed.style.removeProperty('display');
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

export function initPurger(userSettings: Settings) {

    console.log("initPurger !!")

    toggleHideMainFeed(userSettings.disableFeed);
    toggleHideNewsFeed(userSettings.disableNews);
    findUnwantedSpans(userSettings);

    console.log("toggleHideNewsFeed() triggered")

    const observer = new MutationObserver(() => {
        DEV_LOGS && console.log("mutation occurred");
        if (window.location.href.includes('feed')) {
            findUnwantedSpans(userSettings);
            toggleHideMainFeed(userSettings.disableFeed);
            toggleHideNewsFeed(userSettings.disableNews);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    window.onload = function () {
        DEV_LOGS && console.log("Hello Friend");
        findUnwantedSpans(userSettings); // Initial execution
    };
}

