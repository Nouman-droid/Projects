# Live Translation Tool

## Project Vision

The goal of this project is to build a Chrome Extension capable of translating live Arabic speech into English subtitles in real time.

The primary use case is translating Arabic Islamic lectures for English-speaking audiences.

The extension should capture audio from the active browser tab, transcribe the speech, translate it into English, and display live captions directly over the video.

---

# Long-Term Pipeline

HTML5 Video
        │
        ▼
Capture Tab Audio
        │
        ▼
Speech-to-Text (Whisper)
        │
        ▼
Translation Engine
        │
        ▼
Subtitle Overlay

---

# Technology Stack

Frontend
- Chrome Extension (Manifest V3)
- JavaScript
- HTML
- CSS

Backend (planned)
- Python
- FastAPI

AI (planned)
- Whisper
- Translation Model (TBD)

---

# Project Structure

LiveTranslationTool/
│
├── Backend/
│
├── Docs/
│   ├── architecture.md
│   ├── requirements.md
│   ├── roadmap.md
│   └── project-context.md
│
└── Extension/
    ├── manifest.json
    ├── popup.html
    ├── popup.js
    ├── content.js
    └── style.css

---

# Current Progress

Completed

✓ Chrome extension created

✓ Manifest V3 configured

✓ Popup implemented

✓ Selected text extraction working

✓ Content script configured

✓ Basic overlay injection

Current content.js

```javascript
const container = document.createElement("div");

container.id = "translator-overlay";
container.className = "overlay";
container.innerHTML = "<p>Hello World</p>";

document.body.appendChild(container);
```

---

# Current Sprint

Sprint 1

Goal:

Build the subtitle overlay.

Tasks

- Inject overlay into webpages
- Style overlay
- Position overlay at bottom-center
- Make it resemble YouTube subtitles

No translation yet.

No backend yet.

---

# UI Decisions

Subtitle Position

Bottom-center

Reason:
- Easy to read
- Doesn't block speaker's face
- Familiar UI similar to YouTube and Netflix

Overlay

- White text
- Dark semi-transparent background
- Rounded corners
- Fixed position
- High z-index

---

# Development Philosophy

Build one layer at a time.

1. Display subtitles
2. Capture audio
3. Speech recognition
4. Translation
5. Optimization

Do not attempt everything simultaneously.

---

# Immediate Next Tasks

1. Finish style.css
2. Verify overlay appears on webpages
3. Replace "Hello World" with a proper subtitle layout
4. Create functions for updating subtitle text dynamically
5. Begin audio capture research

---

# Future Milestones

Sprint 2
- Better subtitle UI
- Dynamic subtitle updates

Sprint 3
- Capture browser tab audio

Sprint 4
- Whisper integration

Sprint 5
- Translation engine

Sprint 6
- Live subtitles

Sprint 7
- Performance improvements

---

# Coding Standards

- Keep HTML, CSS, and JavaScript responsibilities separate.
- Write readable code.
- Avoid unnecessary complexity.
- Comment non-obvious logic.
- Build features incrementally.

---

# End Goal

A production-ready Chrome extension capable of translating live Arabic lectures into accurate English subtitles with minimal latency.