// vim: et sts=2 ts=2 sw=2

console.log('fuckyoui');

function matches(url) {
  return url.includes('/shorts/');
}

function replace(url) {
  return url.replace(/shorts\//, 'watch?v=');
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('loaded');
  const as = document.getElementsByTagName('a');
  for (let a of as) {
    if (matches(a.href)) {
      console.log('replacing ' + a);
      a.href = replace(a.href);
    }
  }
}, false);
