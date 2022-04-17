// vim: et sts=2 ts=2 sw=2

console.log('reload');

const filter = {
  url: [
    {hostContains: "youtube.com"},
  ]
};

let updated = new Set();
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  let url = changeInfo.url;
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
});
