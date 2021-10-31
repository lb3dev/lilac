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
        return href.startsWith('/watch') || href.startsWith('/channel') || href.startsWith('/user') || href.startsWith('/c');
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

    function player() {
        const player = document.getElementById('movie_player');

        // Set playback quality
        const qualities = ['highres', 'hd2160', 'hd1440', 'hd1080', 'hd720', 'large', 'medium', 'small', 'tiny', 'auto'];
        const quality = 'hd1440';
        const availbleQualities = player.getAvailableQualityLevels().reverse();
        if (availbleQualities.length === 0) {
            return;
        }
        if (availbleQualities.includes(quality)) {
            player.setPlaybackQuality(quality);
            player.setPlaybackQualityRange(quality);
            console.log('Setting playback quality to: ' + quality);
        } else {
            let pick = availbleQualities[0];
            availbleQualities.forEach((availableQuality) => {
                if (qualities.indexOf(availableQuality) > qualities.indexOf(quality)) {
                    pick = availableQuality;
                }
            });
            player.setPlaybackQuality(pick);
            player.setPlaybackQualityRange(pick);
            console.log('Setting playback quality to: ' + pick);
        }
    }

    function watchPage() {
        theaterMode();
        player();
        removeCommentsWithUrls();
    }

    document.addEventListener('lilac-navigate-finish', (event) => {
        const navigation = event.detail;
        if (navigation.pageType === 'watch') {
            watchPage();
        }
    });
})();