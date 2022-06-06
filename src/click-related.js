const strings = Array.from(document.getElementByTagName('yt-formatted-string'))
const related = strings.filter(elt => elt.title == 'Related')
if (related.length > 0) {
  related[0].click()
}
