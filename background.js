// vim: et sts=2 ts=2 sw=2

const filter = {
  url: [
    {hostContains: "youtube.com"},
  ]
};

var replacedTabs = new Set();

function changeUrl(details) {
  console.log('looking at tab ' + details.tabId);
  if (!replacedTabs.has(details.tabId)) {
    console.log('editing tab ' + details.tabId);
    replacedTabs.add(details.tabId);
    browser.tabs.update(details.tabId, {
      url: details.url.replace(/youtube.com\/shorts\//, 'youtube.com/watch?v=')
    });
  }
}

function finishReplace(details) {
  console.log('finished with tab ' + details.tabId);
  replacedTabs.delete(details.tabId);
}

browser.webNavigation.onBeforeNavigate.addListener(changeUrl, filter);
browser.webNavigation.onCompleted.addListener(finishReplace, filter);

