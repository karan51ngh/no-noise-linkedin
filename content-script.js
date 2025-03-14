function deleteSpansFeedPostParent(element, count) {
    if (count == 4) {
        element.remove();
        return;
    }
    else {
        deleteSpansFeedPostParent(element.parentNode, count + 1);
    }
}

function findSuggestedPostSpans() {
    const spans = Array.from(document.getElementsByTagName("span"))
        .filter(span => span.innerHTML === "\n            <!---->Suggested<!---->\n          ");

    spans.forEach((s) => {
        s.innerHTML = "\n            <!---->REMOVING Suggested POST SOON!!!<!---->\n          ";
        deleteSpansFeedPostParent(s, 0);
    })
}

// detect scroll
document.addEventListener("scroll", () => {
    findSuggestedPostSpans();
    console.log("scroll detected")
});

window.onload = function () {
    console.log("Hello Friend");

    let hasRun = false; // Flag to track execution

    function runOnce() {
        console.log("run once")
        if (!hasRun) {
            hasRun = true;
            findSuggestedPostSpans();
        }
    }

    runOnce(); // Initial execution

    let observer = new MutationObserver((mutations) => {
        console.log("mutation occurred");
        if (!hasRun) {
            runOnce();
            observer.disconnect(); // Stop observing after the first run
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
};