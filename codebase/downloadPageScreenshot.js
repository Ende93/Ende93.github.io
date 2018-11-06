import html2canvas from 'html2canvas'
 
function downloadFile(fileName, content) {
  var eleA = document.createElement('a')
  if (window.navigator.msSaveBlob) {
    // for ie 10 and later
    try {
      window.navigator.msSaveBlob(new Blob([content]), fileName)
    } catch (e) {
      console.error(e);
    }
  } else {
    content = content.replace('image/png', 'image/octet-stream')
    var clickEvent = document.createEvent('MouseEvents')
    clickEvent.initEvent('click', true, true)
    
    eleA.download = fileName
    eleA.href = content
    eleA.dispatchEvent(clickEvent)
  }
}
/**
 * @params {HTMLElement} element
 * @params {String} filename 
 */
function downloadScreenshot(element, filename) {
  html2canvas(element).then(canvas => {
    downloadFile(filename, canvas.toDataURL('image/png'))
  });
}

export default downloadScreenshot
