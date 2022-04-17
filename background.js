// listen from the popup page for checkbox events
let enabled = true;
browser.runtime.onMessage.addListener(message => {
  enabled = message.checked;
  console.log('popup says ' + enabled);
});

function changeUrl(url, tabId) {
  if (url && url.includes('youtube.com/shorts/')) {
    browser.tabs.update(tabId, {
      url: url.replace(/shorts\//, 'watch?v='),
    });
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

