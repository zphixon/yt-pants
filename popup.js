let checkbox = document.getElementById('enabled');

async function storeEnabled(newValue) {
  browser.storage.local.set({enabled: newValue}).then(() => {
  }, err => {
    console.log('set failed ' + err);
  });
}

async function getEnabled() {
  // least idiotic web browser api be like
  let why = await browser.storage.local.get('enabled');
  if (why == undefined || (why != undefined && why.enabled == undefined)) {
    await storeEnabled(true);
    return true;
  } else {
    return why.enabled;
  }
}

getEnabled().then(enabled => {
  browser.runtime.sendMessage({checked: enabled})
  checkbox.checked = enabled;
});

checkbox.addEventListener('change', (event) => {
  let checked = event.currentTarget.checked;
  storeEnabled(checked).then(() => {
    browser.runtime.sendMessage({checked});
  });
});
