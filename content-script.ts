import { type Settings } from "./src/content-script/constants";

const DEV_LOGS = false;

const promotedPosts: (HTMLElement | null)[] = [];
const suggestedPosts: (HTMLElement | null)[] = [];

function toggleHidePromoted(toggle : boolean) {
    promotedPosts.forEach((pp) => {
        pp?.remove();
    })
}

function toggleHideSuggested(toggle : boolean) {
    suggestedPosts.forEach((sp) => {
        sp?.remove();
    })
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
        toggleHideSuggested(userSettings.disableSuggested);

    })

    promotedSpans.forEach((s) => {
        deleteUnwantedSpans('promoted', s, 0);
        toggleHidePromoted(userSettings.disablePromoted);

    })
}

export function initPurger(userSettings: Settings) {

    console.log("initPurger !!")

    const observer = new MutationObserver(() => {
        DEV_LOGS && console.log("mutation occurred");
        if (window.location.href.includes('feed')) findUnwantedSpans(userSettings);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    window.onload = function () {
        DEV_LOGS && console.log("Hello Friend");
        findUnwantedSpans(userSettings); // Initial execution
    };
}

