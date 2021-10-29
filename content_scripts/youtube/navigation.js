(() => {
    // PageTypes: watch, channel, browse, search, playlist

    function navigateStartBySpfEvent(event) {
        const url = event.detail.url;
        const pageType = event.detail.pageType;
        navigateEvent(url, pageType, true);
    }

    function navigateFinishBySpfEvent(event) {
        const url = event.detail.response.url;
        const pageType = event.detail.pageType;
        navigateEvent(url, pageType, false);
    }

    function navigateEvent(url, pageType, start) {
        const state = { url: url, pageType: pageType };
        const eventName = start ? 'lilac-navigate-start' : 'lilac-navigate-finish';   

        document.dispatchEvent(new CustomEvent(eventName, {
            detail: state
        }));
    }

    document.addEventListener('yt-navigate-start', navigateStartBySpfEvent);
    document.addEventListener('yt-navigate-finish', navigateFinishBySpfEvent);
})();