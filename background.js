const activeCameraTabs = new Set();

const startRecording = async (audioEnabled) => {
  await chrome.tabs.query({'active': true, 'lastFocusedWindow': true, 'currentWindow': true}, async function (tabs) {
    // Get current tab to focus on it after start recording on recording screen tab
    const currentTab = tabs[0];

    // Create recording screen tab
    const tab = await chrome.tabs.create({
      url: chrome.runtime.getURL('recording_screen.html'),
      pinned: true,
      active: true,
    });

    // Wait for recording screen tab to be loaded and send message to it with the currentTab
    chrome.tabs.onUpdated.addListener(async function listener(tabId, info) {
      if (tabId === tab.id && info.status === 'complete') {
        chrome.tabs.onUpdated.removeListener(listener);

        await chrome.tabs.sendMessage(tabId, {
          name: 'startRecordingOnBackground',
          body: {
            currentTab: currentTab,
            audioEnabled:audioEnabled
          },
        });
      }
    });
  });
};

// Listen for startRecording message from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.name === 'startRecording') {
    startRecording(audioEnabled=request.audioEnabled);
    sendResponse({ status: 'Recording started' }); // Ensure a response is sent
  }  
  if (request.name === "saveVideoUrl") {
    chrome.storage.local.set({ recordedVideo: request.body.videoUrl }, () => {
      console.log("Video URL stored in chrome.storage");
      sendResponse({ status: 'Video URL saved' }); // Ensure a response is sent
    });
    return true
  }
});