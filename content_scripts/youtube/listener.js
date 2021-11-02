var _lilac_listener = (() => {
    'use strict';
    
    // App elements
    let watchFlexy = null;

    const listeners = {};

    let elementsObserver = null;
    const observerConfig = { attributes: false, childList: true, subtree: true };

    registerListener('YTD-WATCH-FLEXY',
        (addedNode, mutation) => {
            return addedNode.tagName === 'YTD-WATCH-FLEXY';
        }, (addedNode) => {
            watchFlexy = addedNode;
        }
    );

    const callback = function(mutations, observer) {
        mutations.filter((mutation) => {
            return mutation.type === 'childList' && mutation.addedNodes.length > 0
        }).forEach((mutation) => {
            mutation.addedNodes.forEach(addedNode => {
                for (const [key, listener] of Object.entries(listeners)) {
                    if (listener.test(addedNode, mutation)) {
                        listener.callback(addedNode);
                    }
                }
            });
        });
    };

    elementsObserver = new MutationObserver(callback);
    elementsObserver.observe(document, observerConfig);

    function getWatchFlexy() {
        const query = document.querySelector('ytd-watch, ytd-watch-flexy');
        return query ? query : watchFlexy;
    }

    function getVideosTab() {
        return new Promise((resolve, reject) => {
            function checkVideosTab() {
                const videosTab = document.querySelector('tp-yt-paper-tab.style-scope:nth-child(4) > div');

                if (!videosTab) {
                    setTimeout(() => {
                        checkVideosTab();
                    }, 100);
                } else {
                    resolve(videosTab);
                }
            }
            checkVideosTab();
        });
    }

    function registerListener(key, condition, callback) {
        listeners[key] = {
            test: condition,
            callback: callback
        };
    }

    return {
        getWatchFlexy: getWatchFlexy,
        getVideosTab: getVideosTab,
        registerListener: registerListener
    };
})();