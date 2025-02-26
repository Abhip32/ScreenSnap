# ScreenSnap

ScreenSnap is a Chrome extension developed to capture screenshots and record screen activities directly from your browser. This project serves as a practical exercise to understand the workings of the Chrome Extensions API, particularly focusing on capturing visible tabs and managing media streams.

## Features

- **Screen Recording**: Record your screen activities, including the entire screen, specific application windows.
- **Recent Capture**: Access the most recent screenshots directly from the extension for quick viewing or downloading.

## Sample Recording produced using this tool
https://github.com/user-attachments/assets/f73bc284-e3be-4b5c-9575-228b3a021ef5


## Installation

1. **Clone the Repository**: Download or clone this repository to your local machine.

   ```bash
   git clone https://github.com/Abhip32/ScreenSnap.git
   ```


2. **Load the Extension in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" by toggling the switch in the top right corner.
   - Click on "Load unpacked" and select the cloned `ScreenSnap` directory.

## Usage

- **Recording the Screen**:
  - Click on the ScreenSnap extension icon.
  - Select the "Start Recording" option.
  - Choose the entire screen or application window you wish to record you can also keep audio option on if want.
  - To stop recording, click the "Stop Recording" button in the extension popup.
  - The recorded video will be saved and a link to view it will be provided.

## Project Structure

- `manifest.json`: Defines the extension's metadata and permissions.
- `background.js`: Handles background processes, including context menu actions and message passing.
- `content.js`: Injected into web pages to interact with page content when necessary.
- `popup.html` & `popup.js`: Define the extension's popup interface and its functionality.
- `recording_screen.html` & `recording_screen.js`: Manage the screen recording interface and logic.
- `video_player.html` & `video_player.js`: Provide a simple interface to view recorded videos.
- `icons/`: Contains the extension's icons used in the toolbar and context menus.

## Learning Objectives

This project was created to explore and understand:

- **Chrome Extensions API**: Utilizing APIs such as `chrome.tabs.captureVisibleTab` for capturing screenshots and `chrome.desktopCapture` for screen recording.
- **Extension Architecture**: Structuring an extension with background scripts, content scripts, and popup interfaces.
- **Permissions Management**: Requesting and handling necessary permissions in `manifest.json`.
- **User Interface Design**: Creating intuitive and responsive interfaces for extension popups and pages.

## Summary

By developing ScreenSnap, I gained hands-on experience with Chrome's extension capabilities, enhancing my understanding of browser APIs and extension development workflows. 
