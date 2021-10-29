// Anonymous function invoke to avoid polluting global variable namespace in the original page context

(() => {
    'use strict';

    function getChannelNavigateUrl(url, tab) {
        let paths = url.split('/');
        if (paths.length === 3) {
            paths.push(tab);
        }
        if (paths.length === 4) {
            paths[3] = tab;
        }
        return paths.join('/');
    }
    
    function toVideos(navigation) {
        let url = navigation.url;
        let navigateTo = getChannelNavigateUrl(url, 'videos');
        if ((!navigation.isPrevPageSameType || navigation.visited <= 1) && !url.endsWith('/videos')) {
            window.spf.navigate(navigateTo);
        }   
    }

    function channelPage(navigation) {
        // toVideos(navigation);
    }

    document.addEventListener('lilac-navigate-finish', (event) => {
        let navigation = event.detail;
        if (navigation.pageType === 'channel') {
            channelPage(navigation);
        }
    });
})();