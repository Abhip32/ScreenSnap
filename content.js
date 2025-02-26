// Wait for the endedRecording message from recording_screen.js
chrome.runtime.onMessage.addListener((request) => {
  // Create a new tab with the video
  chrome.runtime.sendMessage({
    name: 'openVideoInNewTab',
    body: {
      base64: request.body.base64
    }
  });
});


