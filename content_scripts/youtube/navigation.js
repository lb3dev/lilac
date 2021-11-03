var _lilac_navigation = (() => {
    'use strict';

    const states = [];
    // PageTypes: watch, channel, browse, search, playlist

    function getBrowseIdFromEventDetail(detail) {
        if (detail && detail.endpoint && detail.endpoint.browseEndpoint && detail.endpoint.browseEndpoint.browseId) {
            return detail.endpoint.browseEndpoint.browseId;
        }
        return null;
    }

    function navigateStartBySpfEvent(event) {
        const url = event.detail.url;
        const pageType = event.detail.pageType;
        navigateEvent(url, pageType, event.detail, true);
    }

    function navigateFinishBySpfEvent(event) {
        const url = event.detail.response.url;
        const pageType = event.detail.pageType;
        navigateEvent(url, pageType, event.detail, false);
    }

    function pushFinishState(state) {
        if (states.length > 1) {
            states.shift();
        }
        states.push(state);
    }

    function getNavigationStates() {
        return states;
    }

    function navigateEvent(url, pageType, detail, start) {
        const state = {
            url: url,
            pageType: pageType,
            browseId: getBrowseIdFromEventDetail(detail)
        };
        const eventName = start ? 'lilac-navigate-start' : 'lilac-navigate-finish';   

        if (!start) {
            pushFinishState(state);
        }

        document.dispatchEvent(new CustomEvent(eventName, {
            detail: state
        }));
    }

    document.addEventListener('yt-navigate-start', navigateStartBySpfEvent);
    document.addEventListener('yt-navigate-finish', navigateFinishBySpfEvent);

    return {
        getNavigationStates: getNavigationStates
    };
})();