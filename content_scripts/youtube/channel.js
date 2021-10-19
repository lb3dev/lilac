// Anonymous function invoke to avoid polluting global variable namespace in the original page context

(() => {
    function toVideos(navigation) {
        let url = navigation.url;
        if (!navigation.isPrevPageSameType && !url.endsWith('/videos')) {
            window.spf.navigate(url + '/videos');
        }   
    }

    function channelPage(navigation) {
        toVideos(navigation);
    }

    document.addEventListener('lilac-ext-navigate', function (event) {
        let navigation = event.detail;
        if (navigation.pageType === 'channel') {
            channelPage(navigation);
        }
    });
})();