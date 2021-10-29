// Anonymous function invoke to avoid polluting global variable namespace in the original page context

(() => {
    'use strict';

    function theaterMode() {
        const watchFlexy = _lilac_listener.getWatchFlexy();
        if (watchFlexy && !watchFlexy.theaterRequested_) {
            watchFlexy.theaterModeChanged_(true);
        }
    }

    function isHrefInternal(href) {
        return href.startsWith('/watch');
    }

    function removeCommentsWithUrls() {
        _lilac_listener.registerListener('YTD-COMMENT-THREAD-RENDERER',
            (addedNode, mutation) => {
                return addedNode.tagName === 'YTD-COMMENT-THREAD-RENDERER' || addedNode.tagName === 'YTD-COMMENT-RENDERER';
            }, (addedNode) => {
                const commentNode = addedNode;
                let toFilter = false;

                const spannedComents = commentNode.querySelectorAll('#body #main #expander #content #content-text > .yt-formatted-string');
                if (spannedComents && spannedComents.length > 0) {
                    spannedComents.forEach((spannedComment) => {
                        if (spannedComment.tagName === 'A') {
                            const href = spannedComment.getAttribute('href');
                            if (!href) {
                                spannedComment.parentNode.removeChild(spannedComment);
                            }
                            if (href && !isHrefInternal(href)) {
                                toFilter = true;
                            }
                        }
                    });
                }

                if (toFilter) {
                    commentNode.style.display = 'none';
                }
            });
    }

    function watchPage() {
        theaterMode();
        removeCommentsWithUrls();
    }

    document.addEventListener('lilac-navigate-finish', (event) => {
        const navigation = event.detail;
        if (navigation.pageType === 'watch') {
            watchPage();
        }
    });
})();