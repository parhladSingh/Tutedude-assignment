// import React, { useState, useEffect, useRef } from "react";
// import VideoFeed from "./components/VideoFeed";
// import FocusDetection from "./components/FocusDetection";
// import ObjectDetection from "./components/ObjectDetection";

// export default function App() {
//   const [videoEl, setVideoEl] = useState(null);
//   const [canvasEl, setCanvasEl] = useState(null);
//   const [logs, setLogs] = useState([]);
//   const [candidateName, setCandidateName] = useState("");
//   const [startTime, setStartTime] = useState(null);
//   const [endTime, setEndTime] = useState(null);
//   const logsEndRef = useRef(null);

//   const handleStreamReady = (stream, vEl, cEl) => {
//     console.log("Stream ready:", stream, vEl, cEl);
//     setVideoEl(vEl);
//     setCanvasEl(cEl);
//     setStartTime(new Date());
//   };

//   const addLogEvent = (event) => {
//     setLogs((prev) => [...prev, event]);
//     console.log("LOG:", event);
//   };

//   // auto scroll logs to bottom
//   useEffect(() => {
//     if (logsEndRef.current) {
//       logsEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [logs]);

  
//   const focusLostCount = logs.filter((l) => l.type === "focus-lost").length;

//   const suspiciousEvents = logs.filter(
//     (l) =>
//       l.type === "multiple-faces" ||
//       l.type === "no-face" ||
//       l.type === "phone-detected" || // ✅ include phone
//       l.type === "notes-detected"    // ✅ include notes
//   );

//   // Integrity Score
//   const integrityScore =
//     100 - (focusLostCount * 5 + suspiciousEvents.length * 10);

//   // Function to download logs as CSV
//   const downloadReport = () => {
//     if (!startTime) {
//       alert("Interview has not started yet!");
//       return;
//     }

//     setEndTime(new Date());
//     const durationMinutes = Math.round(
//       ((endTime || new Date()) - startTime) / 1000 / 60
//     );

//     const header = [
//       "Candidate Name",
//       "Interview Duration (min)",
//       "Focus Lost Count",
//       "Suspicious Events Count",
//       "Integrity Score",
//       "Type",
//       "Message",
//       "Timestamp",
//     ];

//     const rows = logs.map((log) => [
//       candidateName || "Unknown",
//       durationMinutes,
//       focusLostCount,
//       suspiciousEvents.length,
//       integrityScore,
//       log.type,
//       log.message,
//       log.timestamp,
//     ]);

//     const csvContent =
//       [header, ...rows].map((e) => e.join(",")).join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);

//     const link = document.createElement("a");
//     link.setAttribute("href", url);
//     link.setAttribute("download", "proctoring_report.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       {/* Left side - Video & Detection */}
//       <div style={{ flex: 3, padding: 20 }}>
//         <h2>Tutedude — Proctor Demo</h2>

//         {/*  Candidate Name Input */}
//         <div style={{ marginBottom: 10 }}>
//           <label>
//             Candidate Name:{" "}
//             <input
//               type="text"
//               value={candidateName}
//               onChange={(e) => setCandidateName(e.target.value)}
//               placeholder="Enter candidate name"
//               style={{ padding: "4px 6px", marginLeft: "6px" }}
//             />
//           </label>
//         </div>

//         {/* Prevent Start Camera until name entered */}
//         {candidateName.trim() === "" ? (
//           <button
//             onClick={() => alert("⚠️ Please enter your name before starting.")}
//             style={{
//               padding: "10px 12px",
//               background: "#ff9800",
//               color: "black",
//               border: "none",
//               borderRadius: 4,
//               cursor: "not-allowed",
//             }}
//           >
//             Start Camera
//           </button>
//         ) : (
//           <VideoFeed onStreamReady={handleStreamReady} />
//         )}

       
//        {videoEl && canvasEl && (
//   <>
//     <FocusDetection
//       videoEl={videoEl}
//       canvasEl={canvasEl}
//       addLogEvent={addLogEvent}
//     />
//     <ObjectDetection
//       videoEl={videoEl}
//       canvasEl={canvasEl}
//       addLogEvent={addLogEvent}
//     />
//   </>
// )}
//       </div>

//       {/*  Logs Sidebar */}
//       <div
//         style={{
//           flex: 1,
//           borderLeft: "2px solid #ddd",
//           padding: 12,
//           background: "#ff9800",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <h3 style={{ margin: "0 0 10px" }}>Event Logs</h3>

//         {/* Quick stats above logs */}
//         <div style={{ marginBottom: 10, fontSize: 14, color: "#333" }}>
//           <p>
//             <strong>Candidate:</strong> {candidateName || "N/A"}
//           </p>
//           <p>
//             <strong>Focus Lost:</strong> {focusLostCount}
//           </p>
//           <p>
//             <strong>Suspicious Events:</strong> {suspiciousEvents.length}
//           </p>
//           <p>
//             <strong>Integrity Score:</strong> {integrityScore}
//           </p>
//         </div>

//         <div
//           style={{
//             flex: 1,
//             overflowY: "auto",
//             border: "1px solid #ccc",
//             borderRadius: 4,
//             padding: 8,
//             background: "white",
//           }}
//         >
//           {logs.length === 0 ? (
//             <div>No events yet</div>
//           ) : (
//             logs.map((l, i) => (
//               <div
//                 key={i}
//                 style={{
//                   padding: "6px 4px",
//                   borderBottom: "1px solid #eee",
//                   fontSize: 14,
//                 }}
//               >
//                 <strong style={{ color: "#333" }}>{l.type}</strong> — {l.message}
//                 <br />
//                 <small style={{ color: "#666" }}>{l.timestamp}</small>
//               </div>
//             ))
//           )}
//           <div ref={logsEndRef} />
//         </div>

//         {/* Download Report Button */}
//         <button
//           onClick={downloadReport}
//           style={{
//             marginTop: 12,
//             padding: "10px 12px",
//             background: "#007bff",
//             color: "white",
//             border: "none",
//             borderRadius: 4,
//             cursor: "pointer",
//           }}
//         >
//           ⬇️ Download Report
//         </button>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect, useRef } from "react";
import VideoFeed from "./components/VideoFeed";
import FocusDetection from "./components/FocusDetection";
import ObjectDetection from "./components/ObjectDetection";

export default function App() {
  const [videoEl, setVideoEl] = useState(null);
  const [canvasEl, setCanvasEl] = useState(null);
  const [logs, setLogs] = useState([]);
  const [candidateName, setCandidateName] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const logsEndRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // detect if user is on mobile
  useEffect(() => {
    const checkMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(
      navigator.userAgent
    );
    setIsMobile(checkMobile);
  }, []);

  const handleStreamReady = (stream, vEl, cEl) => {
    console.log("Stream ready:", stream, vEl, cEl);
    setVideoEl(vEl);
    setCanvasEl(cEl);
    setStartTime(new Date());
  };

  const addLogEvent = (event) => {
    setLogs((prev) => [...prev, event]);
    console.log("LOG:", event);
  };

  // auto scroll logs to bottom
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const focusLostCount = logs.filter((l) => l.type === "focus-lost").length;

  const suspiciousEvents = logs.filter(
    (l) =>
      l.type === "multiple-faces" ||
      l.type === "no-face" ||
      l.type === "phone-detected" ||
      l.type === "notes-detected"
  );

  const integrityScore =
    100 - (focusLostCount * 5 + suspiciousEvents.length * 10);

  const downloadReport = () => {
    if (!startTime) {
      alert("Interview has not started yet!");
      return;
    }

    setEndTime(new Date());
    const durationMinutes = Math.round(
      ((endTime || new Date()) - startTime) / 1000 / 60
    );

    const header = [
      "Candidate Name",
      "Interview Duration (min)",
      "Focus Lost Count",
      "Suspicious Events Count",
      "Integrity Score",
      "Type",
      "Message",
      "Timestamp",
    ];

    const rows = logs.map((log) => [
      candidateName || "Unknown",
      durationMinutes,
      focusLostCount,
      suspiciousEvents.length,
      integrityScore,
      log.type,
      log.message,
      log.timestamp,
    ]);

    const csvContent =
      [header, ...rows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "proctoring_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 🔥 Wrapper for mobile check
  if (isMobile) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ff9800",
          fontSize: "20px",
          fontWeight: "bold",
          textAlign: "center",
          padding: "20px",
        }}
      >
        ⚠️ Please open this application on a Laptop/Desktop
      </div>
    );
  }

  // 👇 Original code untouched
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left side - Video & Detection */}
      <div style={{ flex: 3, padding: 20 }}>
        <h2>Tutedude — Proctor Demo</h2>

        {/*  Candidate Name Input */}
        <div style={{ marginBottom: 10 }}>
          <label>
            Candidate Name:{" "}
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="Enter candidate name"
              style={{ padding: "4px 6px", marginLeft: "6px" }}
            />
          </label>
        </div>

        {/* Prevent Start Camera until name entered */}
        {candidateName.trim() === "" ? (
          <button
            onClick={() => alert("⚠️ Please enter your name before starting.")}
            style={{
              padding: "10px 12px",
              background: "#ff9800",
              color: "black",
              border: "none",
              borderRadius: 4,
              cursor: "not-allowed",
            }}
          >
            Start Camera
          </button>
        ) : (
          <VideoFeed onStreamReady={handleStreamReady} />
        )}

        {videoEl && canvasEl && (
          <>
            <FocusDetection
              videoEl={videoEl}
              canvasEl={canvasEl}
              addLogEvent={addLogEvent}
            />
            <ObjectDetection
              videoEl={videoEl}
              canvasEl={canvasEl}
              addLogEvent={addLogEvent}
            />
          </>
        )}
      </div>

      {/*  Logs Sidebar */}
      <div
        style={{
          flex: 1,
          borderLeft: "2px solid #ddd",
          padding: 12,
          background: "#ff9800",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3 style={{ margin: "0 0 10px" }}>Event Logs</h3>

        {/* Quick stats above logs */}
        <div style={{ marginBottom: 10, fontSize: 14, color: "#333" }}>
          <p>
            <strong>Candidate:</strong> {candidateName || "N/A"}
          </p>
          <p>
            <strong>Focus Lost:</strong> {focusLostCount}
          </p>
          <p>
            <strong>Suspicious Events:</strong> {suspiciousEvents.length}
          </p>
          <p>
            <strong>Integrity Score:</strong> {integrityScore}
          </p>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: 4,
            padding: 8,
            background: "white",
          }}
        >
          {logs.length === 0 ? (
            <div>No events yet</div>
          ) : (
            logs.map((l, i) => (
              <div
                key={i}
                style={{
                  padding: "6px 4px",
                  borderBottom: "1px solid #eee",
                  fontSize: 14,
                }}
              >
                <strong style={{ color: "#333" }}>{l.type}</strong> — {l.message}
                <br />
                <small style={{ color: "#666" }}>{l.timestamp}</small>
              </div>
            ))
          )}
          <div ref={logsEndRef} />
        </div>

        {/* Download Report Button */}
        <button
          onClick={downloadReport}
          style={{
            marginTop: 12,
            padding: "10px 12px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          ⬇️ Download Report
        </button>
      </div>
    </div>
  );
}

