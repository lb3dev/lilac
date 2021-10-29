const _lilac_listener = (() => {
    // App elements
    let watchFlexy = null;
    let watchCommentsRenderer = null;

    const listeners = {};

    let elementsObserver = null;
    const observerConfig = { attributes: false, childList: true, subtree: true };

    registerAddListener('YTD-WATCH-FLEXY',
    (addedNode, mutation) => {
        return addedNode.tagName === 'YTD-WATCH-FLEXY';
    }, (addedNode) => {
        watchFlexy = addedNode;
    });

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

    function registerAddListener(key, condition, callback) {
        listeners[key] = {
            test: condition,
            callback: callback
        };
    }

    return {
        getWatchFlexy: getWatchFlexy,
        registerAddListener: registerAddListener
    };
})();