const screenInfo = {
    url: "",
    title: "No title"
};

chrome.action.onClicked.addListener(tab => {
    chrome.tabs.captureVisibleTab(
        {format: "png", quality: 100},
        dataUrl => {
            screenInfo.url = dataUrl,
            screenInfo.title = tab.title
        
            chrome.tabs.create({url: '/view/index.html'})
        }
    );

})

chrome.runtime.onMessage.addListener((message, sender, sendRes) => {
    if(message === 'get_screen_info') {
        sendRes(screenInfo)
    }
})