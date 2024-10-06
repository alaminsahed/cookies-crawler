// Fetch cookies from the document's content (e.g., access document.cookie)
let allCookies = document.cookie;

// Send cookies back to the background script
chrome.runtime.sendMessage({ cookies: allCookies }, function (response) {
    console.log("Cookies sent to background script:", response);
});
