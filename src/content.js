import html2canvas from 'html2canvas';

//Elements selection
const screenArea = document.querySelector(".screen-area");
const backgroundPicker = document.querySelector('input[type="color"');
const dlButton = document.querySelector(".dl-button");

//Get the data for the preview and add it to the page.
chrome.runtime.sendMessage('get_screen_info', res => {
    const screenshot = document.querySelector(".screen-container img");
    const tab = document.querySelector(".title");

    tab.textContent = res.title

    if(res.url.length > 0) {
        screenshot.src = res.url
    }
})
console.log(backgroundPicker)
//Change the background with the background picker input
backgroundPicker.addEventListener('input', (e) => {
    screenArea.style.backgroundColor = e.target.value
})

//Select the screen area and the download button, on click convert to canvas, create a link with the base64Url and save it. 


dlButton.addEventListener('click', async (e) => {
    html2canvas(screenArea).then((canvas) => {
        const dlLink = document.createElement('a');
        dlLink.href =  canvas.toDataURL().replace('image/png', 'image/octet-stream');
        dlLink.download = 'screen.png';
        dlLink.click();
    })
})