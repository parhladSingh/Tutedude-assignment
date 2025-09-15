# 🎥 Tutedude — Proctoring System (SDE Assignment)

## 📌 Overview
This project is a **video proctoring system** built for online interviews/exams.  
It ensures integrity by detecting:
- Whether the candidate is focused on the screen.
- Unauthorized items (phone, books, notes, extra devices).
- Suspicious activities like multiple faces or absence.


## Quick Demo

- **Live link** - https://tutedude-assignment-eight.vercel.app/

---

##  Tech Stack
- **Frontend:** React.js (Vite/CRA)
- **ML Models:** TensorFlow.js, coco-ssd
- **State Management:** React Hooks
- **Styling:** Inline CSS
- **Reporting:** CSV export

---

## Directory Structure
```bash
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
│── package.json
```

##  Installation & Setup

**1. Clone the repository:**
   ```bash
   git clone https://github.com/parhladSingh/Tutedude-assignment.git
```

2. Go to the client folder:
 ```bash
   cd tutedude-assignment
```
**3. Install all dependencies:**
```bash
npm install
```
**4. Start development server:**
```bash
   npm run dev
 ```
**7. Visit `http://localhost:5173`**

