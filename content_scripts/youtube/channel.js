// Anonymous function invoke to avoid polluting global variable namespace in the original page context

var _lilac_channel = (() => {
    'use strict';

    function toVideos() {
        _lilac_listener.getVideosTab().then((videosTab) => {
            const states = _lilac_navigation.getNavigationStates();
            if (states.length < 1) {
                return;
            }
            if (states.length === 1 && !states[0].url.endsWith('/videos')) {
                videosTab.click();
                return;
            }
            const prev = states[0];
            const target = states[1];
            if (prev.pageType !== target.pageType) {
                videosTab.click();
            } else {
                if (prev.browseId !== target.browseId) {
                    videosTab.click();
                }
            }
        });
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