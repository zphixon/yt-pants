// vim: et sts=2 ts=2 sw=2

function storeEnabled(newValue) {
  //browser.storage.local.set({enabled: newValue});
}

function getEnabled() {
  let result;
  browser.storage.local.get('enabled', anObjectWithASingleKeyForSomeGodForsakenReason => {
    if (anObjectWithASingleKeyForSomeGodForsakenReason == undefined) {
      result = true;
      storeEnabled(true);
    } else {
      result = anObjectWithASingleKeyForSomeGodForsakenReason.enabled;
    }
  });
  return result;
}

getEnabled().then(fuck => {
  console.log(fuck);
});
//console.log(getEnabled());

let enabled = true;
let storageValue = getEnabled();
if (storageValue == 'not_set') {
  storeEnabled(true);
} else if (storageValue == 'disabled') {
  enabled = false;
}

browser.storage.local.get('enabled').then(storage => {
  if (storage.enabled != undefined) {
    // if there is an enabled key on the storage object, set our local enabled
    // state to it
    enabled = storage.enabled;
  } else {
    // otherwise, set it to true here and in storage
    enabled = true;
    browser.storage.local.set({enabled});
  }
});

// listen from the popup page for checkbox events
browser.runtime.onMessage.addListener(message => {
  enabled = message.checked;
  browser.storage.local.set({enabled});
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
  if (enabled) {
    changeUrl(changeInfo.url, tabId);
  }
});
