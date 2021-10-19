// Anonymous function invoke to avoid polluting global variable namespace in the original page context

(() => {
    let states = [];
    let pageTypes = [
        'watch',
        'channel',
        'browse',
        'search',
        'playlist'
    ];

    function isPreviousPageSameType() {
        if (states.length > 1) {
            return states[0].pageType === states[1].pageType;
        }
        return true;
    }

    function createAndAddNavigationState(url, pageType) {
        if (states.length > 1) {
            states.shift();
        }

        let state = { url: url, pageType: pageType };
        states.push(state);
        state.isPrevPageSameType = isPreviousPageSameType();
        return state;
    }

    function navigateCompleteBySpfEvent(event) {
        let pageType = event.detail.pageType;
        let url = event.detail.response.url;
        console.log('pageType: ' + pageType);
        console.log('webPageType: ' + window.history.state.endpoint.commandMetadata.webCommandMetadata.webPageType);
        navigationComplete(url, pageType);
    }

    function navigateCompleteByLoad() {
        let pathname = window.location.pathname;
        if (pathname.startsWith('/watch')) {
            navigationComplete(pathname, 'watch');
        }
        if (pathname.startsWith('/c/') || pathname.startsWith('/channel') || pathname.startsWith('/user')) {
            navigationComplete(pathname, 'channel');
        }
    }

    function navigationComplete(url, pageType) {
        let state = createAndAddNavigationState(url, pageType);

        document.dispatchEvent(new CustomEvent('lilac-ext-navigate', {
            detail: state
        }));
    }

    document.addEventListener('yt-navigate-finish', navigateCompleteBySpfEvent);

    navigateCompleteByLoad();
})();