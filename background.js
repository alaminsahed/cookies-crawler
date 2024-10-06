// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.cookies) {
        console.log('Received cookies from content script:', request.cookies);

        // Optionally, process or save the cookies as needed
        const cookiesArray = request.cookies.split('; ');

        cookiesArray.forEach(cookieString => {
            let cookie = cookieString.split('=');
            let cookieName = cookie[0];
            let cookieValue = cookie[1];

            // Set the cookie in the browser (adjust domain and other parameters as needed)
            chrome.cookies.set({
                url: sender.tab.url,
                name: cookieName,
                value: cookieValue,
                expirationDate: (new Date().getTime() / 1000) + 3600 // 1 hour expiration
            }, function (cookie) {
                console.log('Cookie set:', cookie);
            });
        });

        sendResponse({ status: "Cookies processed" });
    }
});

// Schedule the crawler to run every day
chrome.alarms.create("dailyCrawler", { periodInMinutes: 1440 });

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "dailyCrawler") {
        // Replace 'example.com' with the domain you want to crawl
        chrome.tabs.query({ url: "https://example.com/*" }, function (tabs) {
            if (tabs.length > 0) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    files: ['contentScript.js']
                });
            }
        });
    }
});
