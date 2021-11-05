var _lilac_listener = (() => {
    'use strict';
    
    // App elements
    const elements = {};

    const listeners = {};

    let elementsObserver = null;
    const observerConfig = { attributes: false, childList: true, subtree: true };

    registerListener('YTD-WATCH-FLEXY',
        (addedNode, mutation) => {
            return addedNode.tagName === 'YTD-WATCH-FLEXY';
        }, (addedNode) => {
            elements['YTD-WATCH-FLEXY'] = addedNode;
        }
    );

    registerListener('YTD-PLAYER-VOLUME',
        (addedNode, mutation) => {
            return addedNode.tagName === 'SPAN' && addedNode.classList.contains('ytp-volume-area');
        }, (addedNode) => {
            elements['YTD-PLAYER-VOLUME'] = addedNode;
        }
    );

    registerListener('YTD-PLAYER-MINI-PLAYER',
        (addedNode, mutation) => {
            return addedNode.tagName === 'BUTTON' && addedNode.classList.contains('ytp-miniplayer-button');
        }, (addedNode) => {
            elements['YTD-PLAYER-MINI-PLAYER'] = addedNode;
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

    function getAppElement(key) {
        return new Promise((resolve, reject) => {
            function checkAppElement() {
                if (elements[key]) {
                    resolve(elements[key]);
                } else {
                    setTimeout(() => {
                        checkAppElement();
                    }, 100);
                }
            }
            checkAppElement();
        });
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
        getAppElement: getAppElement,
        getVideosTab: getVideosTab,
        registerListener: registerListener
    };
})();