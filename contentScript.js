// Fetch cookies from the document's content (e.g., access document.cookie)
const documents = document.getElementsByTagName('pre')[0].innerText;
let allCookies = documents.cookie;

// Send cookies back to the background script
chrome.runtime.sendMessage({ cookies: allCookies }, function (response) {
    console.log("Cookies sent to background script:", response);
});
