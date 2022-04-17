// vim: et sts=2 ts=2 sw=2

console.log('fukcing why');

function matches(url) {
  // if we are on youtube, match /shorts/
  // otherwise, match youtube.com/shorts/
  //return window.location.includes('youtube.com') && url.includes('/shorts/') || url.includes('youtube.com/shorts/');
  return url.includes('shorts');
}

function replace(url) {
  return url.replace(/shorts\//, 'watch?v=');
}

const as = document.getElementsByTagName('a');
for (let a in as) {
  console.log('fucky ou');
  if (matches(a.href)) {
    a.href = replace(a.href);
  } else {
    console.log('no match');
  }
}
