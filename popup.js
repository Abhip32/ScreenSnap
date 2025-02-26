const startRecording = () => {
  chrome.runtime.sendMessage({ name: "startRecording"});
};



const loadRecordedVideo = () => {
    chrome.storage.local.get("recordedVideo", (data) => {
      const videoContainer = document.getElementById("videoContainer");
      videoContainer.innerHTML = ""; // Clear previous content
  
      if (data.recordedVideo) {
        const videoElement = document.createElement("video");
        videoElement.src = data.recordedVideo;
        videoElement.controls = true;
        videoElement.style.width = "100%";
  
        const buttonContainer = document.createElement("div");
        buttonContainer.style.display = "flex";
        buttonContainer.style.gap = "5px";
        buttonContainer.style.justifyContent = "space-between";
        buttonContainer.style.marginTop = "10px";
  
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete Video";
        deleteButton.onclick = () => {
          chrome.storage.local.remove("recordedVideo", () => {
            videoContainer.innerHTML = "<p>No videos available</p>";
            console.log("Video deleted from storage");
          });
        };
  
        const downloadButton = document.createElement("button");
        downloadButton.innerText = "Download Video";
        downloadButton.onclick = () => {
          const link = document.createElement("a");
          link.href = data.recordedVideo;
          link.download = "recorded_video.mp4";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };
  
        buttonContainer.appendChild(deleteButton);
        buttonContainer.appendChild(downloadButton);
        videoContainer.appendChild(videoElement);
        videoContainer.appendChild(buttonContainer);
      } else {
        videoContainer.innerHTML = "<p>No videos available</p>";
      }
    });
  };
  
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("startRecordingButton").addEventListener("click", startRecording);
    loadRecordedVideo()
    // Load saved camera state
    chrome.storage.local.get(['cameraEnabled'], (result) => {
        if (cameraCheckbox) {
            cameraCheckbox.checked = result.cameraEnabled || false;
        }
    });
});

