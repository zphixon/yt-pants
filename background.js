// listen from the popup page for checkbox events
let enabled = true;
browser.runtime.onMessage.addListener(message => {
  enabled = message.checked;
  console.log('popup says ' + enabled);
});

let updated = new Set();
function changeUrl(url, tabId) {
  if (url && url.includes('youtube.com/shorts/')) {
    if (!updated.has(url)) {
      updated.add(url);
      browser.tabs.update(tabId, {
        url: url.replace(/shorts\//, 'watch?v='),
      });
    } else {
      updated.delete(url);
    }
  }
}

const filter = {
  url: [
    {hostContains: "youtube.com"},
  ]
};

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log('change link? ' + enabled);
  if (enabled) {
    changeUrl(changeInfo.url, tabId);
  }
});

