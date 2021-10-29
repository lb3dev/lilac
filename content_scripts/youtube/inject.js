(() => {
    function injectScript(path) {
        const script = document.createElement('script');
        script.src = browser.runtime.getURL(path);
        script.onload = function() {
            this.remove();
        };
        (document.head || document.documentElement).appendChild(script);
    }

    const scripts = [
        "content_scripts/youtube/listener.js",
        "content_scripts/youtube/channel.js",
        "content_scripts/youtube/watch.js",
        "content_scripts/youtube/navigation.js"
    ]

    scripts.forEach((script) => {
        injectScript(script);
    });
})();