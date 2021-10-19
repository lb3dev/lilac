// Anonymous function invoke to avoid polluting global variable namespace in the original page context

(() => {
    function theaterMode() {
        let watch = document.querySelector('ytd-watch, ytd-watch-flexy');
        if (!watch.theaterRequested_) {
            watch.theaterModeChanged_(true);
        }
    }

    function watchPage(navigation) {
        theaterMode();
    }

    document.addEventListener('lilac-ext-navigate', function (event) {
        let navigation = event.detail;
        if (navigation.pageType === 'watch') {
            watchPage(navigation);
        }
    });
})();