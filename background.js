// vim: et sts=2 ts=2 sw=2

const filter = {
  url: [
    {hostContains: "youtube.com"},
  ]
};

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url && changeInfo.url.includes('youtube.com/shorts/')) {
    console.log('tab ' + tabId + ' navigated to shorts');
    browser.tabs.update(tabId, {
      url: changeInfo.url.replace(/shorts\//, 'watch?v='),
    });
  }
});

