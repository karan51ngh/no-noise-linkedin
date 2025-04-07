DEV_LOGS = false;

function deleteUnwantedSpans(type, element, count) {
    if ((type === 'suggested' && count === 7) || (type === 'promoted' && count === 9)) {
        DEV_LOGS && console.log("Unwanted Post Detected")
        element.remove();
        return;
    }
    else {
        deleteUnwantedSpans(type, element.parentNode, count + 1);
    }
}

function findUnwantedSpans() {
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
        deleteUnwantedSpans('suggested',s, 0);
    })

    promotedSpans.forEach((s) => {
        deleteUnwantedSpans('promoted',s, 0);
    })
}

let observer = new MutationObserver(() => {
    DEV_LOGS && console.log("mutation occurred");
    if (window.location.href.includes('feed')) findUnwantedSpans();
});

observer.observe(document.body, { childList: true, subtree: true });

window.onload = function () {
    DEV_LOGS && console.log("Hello Friend");
    findUnwantedSpans(); // Initial execution
};