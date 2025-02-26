const fetchBlob = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const base64 = await convertBlobToBase64(blob);

  return base64;
};

const convertBlobToBase64 = (blob) => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;

      resolve(base64data);
    };
  });
};

chrome.runtime.onMessage.addListener((message) => {
  if (message.name !== 'startRecordingOnBackground') {
    return;
  }
  console.log('startRecordingOnBackground', message);

  // Prompt user to choose screen or window
  chrome.desktopCapture.chooseDesktopMedia(
    ['screen', 'window','audio'],
    function (streamId) {
      if (streamId == null) {
        return;
      }

      // Once user has chosen screen or window, create a stream from it and start recording
      navigator.mediaDevices.getUserMedia({
        audio: { mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: streamId,
        }
      },
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: streamId,
          }
        }
      }).then(stream => {
        const mediaRecorder = new MediaRecorder(stream);

        const chunks = [];

        mediaRecorder.ondataavailable = function(e) {
          chunks.push(e.data);
        };

        mediaRecorder.onstop = async function (e) {
          const blobFile = new Blob(chunks, { type: "video/webm" });
          const videoUrl = await fetchBlob(URL.createObjectURL(blobFile));


          // Send the video URL to the background script
          chrome.runtime.sendMessage({ name: "saveVideoUrl", body:{videoUrl} }, () => {
            console.log("Sent video URL to background script");
            
            // Open the new tab
            chrome.tabs.create({ url: chrome.runtime.getURL("video_player.html") }).then(()=>{
              chrome.storage.local.set({ cameraEnabled: false });
              window.close()
            });
          });
          // Stop all tracks of stream
          stream.getTracks().forEach(track => track.stop());
        };
        
        
        
        
        mediaRecorder.start();
      }).finally(async () => {
        // After all setup, focus on previous tab (where the recording was requested)
        await chrome.tabs.update(message.body.currentTab.id, { active: true, selected: true })
      });
    })
});