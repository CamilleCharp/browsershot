import html2canvas from 'html2canvas';

const BODY_BG_COLOR = "#171717";
const DEFAULT_SCREEN_BG_COLOR = "#BBC9DC";

//Elements selection
const screenArea = document.querySelector(".screen-area");
const screenSize = {width: Math.floor(screenArea.getBoundingClientRect().width), height: Math.floor(screenArea.getBoundingClientRect().height)};
const backgroundPicker = document.querySelector('input[name="background-picker"');
const widthPicker = document.querySelector('input[name="screen-width"]');
const heightPicker = document.querySelector('input[name="screen-height"]');
const dlButton = document.querySelector(".dl-button");

//Elements state
document.body.style.backgroundColor = BODY_BG_COLOR;
screenArea.style.backgroundColor = DEFAULT_SCREEN_BG_COLOR


//Inputs state
widthPicker.value = screenSize.width;
heightPicker.value = screenSize.height;
backgroundPicker.value = DEFAULT_SCREEN_BG_COLOR;

//config helper
const IS_LANDSCAPE = screenSize.width > screenSize.height;
const SCREEN_RATIO = IS_LANDSCAPE ? screenSize.width / screenSize.height : screenSize.height / screenSize.width

const getHeight = (width) => Math.floor(IS_LANDSCAPE ? width / SCREEN_RATIO : width * SCREEN_RATIO);
const getWidth = (height) => Math.floor(IS_LANDSCAPE ? height * SCREEN_RATIO : height / SCREEN_RATIO);

//Get the data for the preview and add it to the page.
chrome.runtime.sendMessage('get_screen_info', res => {
    const screenshot = document.querySelector(".screen-container img");
    const tab = document.querySelector(".title");

    tab.textContent = res.title

    if(res.url.length > 0) {
        screenshot.src = res.url
    }
})
//Config listeners
backgroundPicker.addEventListener('input', (e) => {
    screenArea.style.backgroundColor = e.target.value
})

widthPicker.addEventListener('change', (e) => {
    screenArea.style.width = e.target.value + "px";
    screenArea.style.height = getHeight(e.target.value) + "px";
    heightPicker.value = Math.ceil(screenArea.getBoundingClientRect().height)
})

heightPicker.addEventListener('change', (e) => {
    screenArea.style.height = e.target.value + "px";
    screenArea.style.width = getWidth(e.target.value) + "px";
    widthPicker.value = Math.ceil(screenArea.getBoundingClientRect().width)
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