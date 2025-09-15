# 🎥 Tutedude — Proctoring System (SDE Assignment)

## 📌 Overview
This project is a **video proctoring system** built for online interviews/exams.  
It ensures integrity by detecting:
- Whether the candidate is focused on the screen.
- Unauthorized items (phone, books, notes, extra devices).
- Suspicious activities like multiple faces or absence.

The system works in real-time on the browser using **React + TensorFlow.js**.

---

## ✨ Features
- ✅ Live webcam feed (start/stop camera).
- ✅ Candidate name input before starting.
- ✅ **Focus Detection**:
  - Detects if candidate looks away for >5s.
  - Detects if no face is present for >10s.
  - Detects multiple faces in the frame.
- ✅ **Object Detection**:
  - Mobile phone, book, notes, paper, laptop, etc.
- ✅ Logs Sidebar:
  - Shows all events with timestamps.
  - Auto-scrolls to latest event.
- ✅ **Proctoring Report (CSV)**:
  - Candidate name
  - Interview duration
  - Focus lost count
  - Suspicious events count
  - Final Integrity Score

---

## 🛠️ Tech Stack
- **Frontend:** React.js (Vite/CRA)
- **ML Models:** TensorFlow.js, coco-ssd
- **State Management:** React Hooks
- **Styling:** Inline CSS
- **Reporting:** CSV export

---

## 📂 Directory Structure

client/
│── public/
│── src/
│ │── components/
│ │ ├── VideoFeed.jsx # Candidate video + webcam access
│ │ ├── FocusDetection.jsx # Face, focus, and multiple-face detection
│ │ ├── ObjectDetection.jsx # Object detection (phone, book, notes, etc.)
│ │ ├── App.jsx # Main app entry point, imports all components
│ │
│ ├── utils/
│ │ ├── detectionHelpers.js # Helper functions (timing, event logging)
│ │
│ ├── index.js # React DOM entry point
│
│── package.jso


## ⚙️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/focus-object-detection.git

2. Go to the client folder:
   cd focus-object-detection/client   
