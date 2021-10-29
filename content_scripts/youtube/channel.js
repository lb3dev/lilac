// Anonymous function invoke to avoid polluting global variable namespace in the original page context

(() => {
    'use strict';

    function getChannelNavigateUrl(url, tab) {
        const paths = url.split('/');
        if (paths.length === 3) {
            paths.push(tab);
        }
        if (paths.length === 4) {
            paths[3] = tab;
        }
        return paths.join('/');
    }

    function getChannelId(url) {
        const paths = url.split('/');
        return paths[2];
    }
    
    function redirectToVideos(url) {
        const redirect = getChannelNavigateUrl(url, 'videos');
        if (!url.endsWith('/videos')) {
            window.spf.navigate(redirect);
        }
    }

    function toVideos() {
        const states = _lilac_navigation.getNavigationStates();
        if (states.length <= 1) {
            return;
        }
        const prev = states[0];
        const target = states[1];
        if (prev.pageType !== target.pageType) {
            redirectToVideos(target.url);
        } else {
            if (getChannelId(prev.url) !== getChannelId(target.url)) {
                redirectToVideos(target.url);
            }
        }
    }

    function channelPage() {
        toVideos();
    }

    document.addEventListener('lilac-navigate-finish', (event) => {
        let navigation = event.detail;
        if (navigation.pageType === 'channel') {
            channelPage();
        }
    });
})();