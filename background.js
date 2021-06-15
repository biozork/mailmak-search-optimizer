var flags = {
    lastUrl: ""
}

// On changes to history state
chrome.webNavigation.onHistoryStateUpdated.addListener(function (tab, frameId, a) {
    let inject = true;

    // Check if url is specifically https://ams.mailmak.com/ then skip inject
    if (tab.url === "https://ams.mailmak.com/"){
        inject = false;
    }    
    
    // Check if url contains ID, then skip inject
    if (tab.url.match(/\/([0-9]+)(?=[^\/]*$)/) != null) {
        inject = false;
    }
    
    // Check if url contains new, then skip inject
    if (tab.url.includes("new")) {
        inject = false;
    }

    // If url contains query, then skip inject
    if (tab.url.includes("query")) {
        inject = false
    }

    // If url contains purchase, then skip inject
    if (tab.url.includes("purchase")) {
        inject = false
    }

    // If url contains sales, then skip inject
    if (tab.url.includes("sales")) {
        inject = false
    }
    
    // If url contains sales, then skip inject
    if (tab.url.includes("orders")) {
        inject = false
    }

    // If url contains products, then skip inject
    if (tab.url.includes("products")) {
        inject = false
    }


    if (tab.url.match(/^.+(?=\?)/)) {
        // Check if search was made again on same page, then skip inject
        if (tab && tab.url && tab.url.match && flags.lastUrl == tab.url.match(/^.+(?=\?)/)[0]) {
            inject = false;
        }

        // If last visited url does not match with current, then set current url as last visited url
        if (flags.lastUrl != tab.url.match(/^.+(?=\?)/)[0]) {
            flags.lastUrl = tab.url.match(/^.+(?=\?)/)[0];
        }

    }

    // If inject is true, then inject script and styles    
    if (inject) {
        
        chrome.tabs.insertCSS(null, {
            file: "inject/injectstyle.css"
        });
        chrome.tabs.executeScript(null, {
            file: "inject/inject.js"
        });
    }
});
