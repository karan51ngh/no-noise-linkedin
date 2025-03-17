function deleteUnwantedSpans(type, element, count) {
    if ((type === 'suggested' && count === 7) || (type === 'promoted' && count === 9)) {
        console.log("Unwanted Post Detected")
        element.remove();
        return;
    }
    else {
        deleteUnwantedSpans(type, element.parentNode, count + 1);
    }
}

function findUnwantedSpans() {
    const suggestedSpans = Array.from(document.getElementsByTagName("span"))
        .filter(span => span.innerHTML === "\n            <!---->Suggested<!---->\n          ");
    
    const promotedSpans = Array.from(document.getElementsByTagName("span"))
        .filter(span => span.innerHTML === "<!---->Promoted<!---->");

    suggestedSpans.forEach((s) => {
        s.innerHTML = "\n            <!---->REMOVING Suggested POST SOON!!!<!---->\n          ";
        deleteUnwantedSpans('suggested',s, 0);
    })

    promotedSpans.forEach((s) => {
        s.innerHTML = "<!---->REMOVING Promoted POST SOON!!!<!---->";
        deleteUnwantedSpans('promoted',s, 0);
    })
}

document.addEventListener("scroll", () => {
    findUnwantedSpans();
    console.log("scroll detected")
});

window.onload = function () {
    console.log("Hello Friend");

    let hasRun = false; // Flag to track execution

    function runOnce() {

        if (!hasRun) {
            hasRun = true;
            findUnwantedSpans();
        }
    }

    findUnwantedSpans(); // Initial execution

    let observer = new MutationObserver((mutations) => {
        console.log("mutation occurred");
        if (!hasRun) {
            runOnce();
            observer.disconnect(); // Stop observing after the first run
            console.log("Observer disconnected");
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
};