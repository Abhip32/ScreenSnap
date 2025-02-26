document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get("recordedVideo", (data) => {
      if (data.recordedVideo) {
        document.getElementById("recordedVideo").src = data.recordedVideo;

        document.getElementById("recordedVideo").onloadeddata = () => {
            URL.revokeObjectURL(data.recordedVideo);
            console.log("✅ Blob URL revoked to free memory.");
          };
      }
    });
  });