let checkbox = document.getElementById('enabled');

async function storeEnabled(newValue) {
  console.log('store ' + newValue);
  browser.storage.local.set({enabled: newValue}).then(() => {
    console.log('set OK');
  }, err => {
    console.log('set failed ' + err);
  });
}

async function getEnabled() {
  // least idiotic web browser api be like
  let why = await browser.storage.local.get('enabled');
  console.log('got from storage ' + JSON.stringify(why));
  if (why == undefined || (why != undefined && why.enabled == undefined)) {
    await storeEnabled(true);
    return true;
  } else {
    return why.enabled;
  }
}

getEnabled().then(enabled => {
  console.log('get enabled for checkbox = ' + enabled);
  browser.runtime.sendMessage({checked: enabled})
  checkbox.checked = enabled;
});

checkbox.addEventListener('change', (event) => {
  let checked = event.currentTarget.checked;
  console.log('checkbox clicked ' + checked);
  storeEnabled(checked).then(() => {
    console.log('telling background that ' + checked);
    browser.runtime.sendMessage({checked});
  });
});
