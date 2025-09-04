# ScreenRecorder

1. Frontend React App
A React app to:

Record Chrome current tab screen + mic using getDisplayMedia and MediaRecorder

Control Start/Stop with timer (max 3 mins)

Playback recorded video with Download button

Upload recording to backend API

List recordings from backend with playback

Here's a minimal React component with comments for main functionality.


2. Backend Node.js + Express + SQL
Basic Express API with these endpoints:

POST /api/recordings: accept multi-part upload and metadata, save file on disk or cloud, save metadata in SQL DB

GET /api/recordings: list recordings metadata + recording file URLs

GET /api/recordings/:id: serve individual recording file
