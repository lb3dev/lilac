// Anonymous function invoke to avoid polluting global variable namespace in the original page context

var _lilac_watch = (() => {
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

    function updateVolumePercentage(display, storedData, player) {
        let percentage = 0;
        if (storedData) {
            percentage = storedData.muted ? 0 : storedData.volume;
            display.innerText = percentage + '%';
        }
        if (!player.getAttribute('lilac-volume-listener')) {
            player.setAttribute('lilac-volume-listener', 'true');
            player.addEventListener('onVolumeChange', (event) => {
                percentage = event.muted ? 0 : Math.round(event.volume);
                display.innerText = percentage + '%';
            }, true);
        }
    }

    function addVolumePercentage() {
        const player = document.getElementById('movie_player');
        const playerVolumeStorage = JSON.parse(localStorage['yt-player-volume']);
        const storedVolumeData = JSON.parse(playerVolumeStorage['data']);

        let volumeDisplay = document.getElementById('lilac_volume_display');
        if (!volumeDisplay) {
            _lilac_listener.getPlayerVolume().then((playerVolume) => {
                playerVolume.insertAdjacentHTML('afterend', '<div id="lilac_volume_display" class="ytp-time-display notranslate"></div>');
                volumeDisplay = document.getElementById('lilac_volume_display');
                updateVolumePercentage(volumeDisplay, storedVolumeData, player);
            });
        } else {
            updateVolumePercentage(volumeDisplay, storedVolumeData, player);
        }
    }

    function setPlaybackQuality() {
        const player = document.getElementById('movie_player');
        const qualities = ['highres', 'hd2160', 'hd1440', 'hd1080', 'hd720', 'large', 'medium', 'small', 'tiny', 'auto'];
        const quality = 'hd1440';
        const availbleQualities = player.getAvailableQualityLevels().reverse();
        if (availbleQualities.length === 0) {
            return;
        }
        if (availbleQualities.includes(quality)) {
            player.setPlaybackQuality(quality);
            player.setPlaybackQualityRange(quality);
        } else {
            let pick = availbleQualities[0];
            availbleQualities.forEach((availableQuality) => {
                if (qualities.indexOf(availableQuality) > qualities.indexOf(quality)) {
                    pick = availableQuality;
                }
            });
            player.setPlaybackQuality(pick);
            player.setPlaybackQualityRange(pick);
        }
    }

    function player() {
        addVolumePercentage();
        setPlaybackQuality();
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