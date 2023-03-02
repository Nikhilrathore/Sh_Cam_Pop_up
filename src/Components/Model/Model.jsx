// // import React, { useState ,useRef} from 'react';
// // import "./model.css"

// // function Popup(props) {
// //     const [videoURL, setVideoURL] = useState(null);
// //     const [recording, setRecording] = useState(false);
// //     let mediaRecorder = null;
// //     let chunks = [];
// //     let timeoutId = null;
// //     const videoRef = useRef(null);
  
// //     function startRecording() {
// //       setRecording(true);
// //       chunks = [];
// //       navigator.mediaDevices
// //         .getUserMedia({ video: true, audio: true })
// //         .then((stream) => {
// //           const video = videoRef.current;
// //           video.srcObject = stream;
// //           mediaRecorder = new MediaRecorder(stream);
// //           mediaRecorder.ondataavailable = (e) => {
// //             chunks.push(e.data);
// //           };
// //           mediaRecorder.onstop = () => {
// //             const blob = new Blob(chunks, { type: "video/mp4" });
// //             const url = URL.createObjectURL(blob);
// //             setVideoURL(url);
// //           };
// //           mediaRecorder.start();
// //           timeoutId = setTimeout(stopRecording, 1000);
// //         })
// //         .catch((error) => {
// //           console.error(error);
// //         });
// //     }
  
// //     function stopRecording() {
// //         setRecording(false);
// //         mediaRecorder.stop();
// //         mediaRecorder.oninactive = () => {
// //           const stream = videoRef.current.srcObject;
// //           const tracks = stream.getTracks();
// //           tracks.forEach((track) => track.stop());
// //           videoRef.current.srcObject = null;
// //           const blob = new Blob(chunks, { type: "video/mp4" });
// //           const url = URL.createObjectURL(blob);
// //           setVideoURL(url);
// //         };
// //       }
  
// //     return (
// //       <div className="popup">
// //         <h2>This is a Popup</h2>
// //         {videoURL ? (
// //           <video src={videoURL} controls />
// //         ) : (
// //           <>
// //             <p>Popup content goes here.</p>
// //             {recording ? (
// //               <button onClick={stopRecording}>Stop Recording</button>
// //             ) : (
// //               <button onClick={startRecording}>Start Recording</button>
// //             )}
// //             <video ref={videoRef} autoPlay muted />
// //           </>
// //         )}
// //         <button onClick={props.onClose}>Close</button>
// //       </div>
// //     );
// //   }
  
// //   export default Popup;


// import React, { useState, useRef } from "react";
// import "./model.css"

// function Popup(props) {
//   const [videoURL, setVideoURL] = useState(null);
//   const [recording, setRecording] = useState(false);
//   const [showCameraPreview, setShowCameraPreview] = useState(true);
//   const mediaRecorderRef = useRef(null);
//   const chunksRef = useRef([]);
//   const videoRef = useRef(null);
//   const timeoutIDRef = useRef(null);
//   const cancelRecording = useRef(() => {});

//   function startRecording() {
//     setRecording(true);
//     setShowCameraPreview(true);
//     chunksRef.current = [];
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         const video = videoRef.current;
//         video.srcObject = stream;
//         mediaRecorderRef.current = new MediaRecorder(stream);
//         mediaRecorderRef.current.ondataavailable = (e) => {
//           chunksRef.current.push(e.data);
//         };
//         mediaRecorderRef.current.onstop = () => {
//           const blob = new Blob(chunksRef.current, { type: "video/mp4" });
//           const url = URL.createObjectURL(blob);
//           setVideoURL(url);
//         };
//         mediaRecorderRef.current.start();
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }

//   function stopRecording() {
//     setRecording(false);
//     setShowCameraPreview(false);
//     mediaRecorderRef.current.stop();
//     mediaRecorderRef.current.oninactive = () => {
//       const stream = videoRef.current.srcObject;
//       const tracks = stream.getTracks();
//       tracks.forEach((track) => track.stop());
//       videoRef.current.srcObject = null;
//     };
//   }

//   return (
//     <div className="popup">
//       <h2>This is a Popup</h2>
//       {videoURL ? (
//         <video src={videoURL} controls />
//       ) : (
//         <>
//           <p>Popup content goes here.</p>
//           {recording ? (
//             <button onClick={stopRecording}>Stop Recording</button>
//           ) : (
//             <button onClick={startRecording}>Start Recording</button>
//           )}
//           {showCameraPreview && <video ref={videoRef} autoPlay muted />}
//         </>
//       )}
//       <button onClick={props.onClose}>Close</button>
//     </div>
//   );
// }

// export default Popup;


import React, { useState, useRef } from "react";
import "./model.css"

function Popup(props) {
  const [videoURL, setVideoURL] = useState(null);
  const [recording, setRecording] = useState(false);
  const [showCameraPreview, setShowCameraPreview] = useState(true);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const videoRef = useRef(null);
  const timeoutIDRef = useRef(null);
  const cancelRecording = useRef(() => {});

  function startRecording() {
    setRecording(true);
    setShowCameraPreview(true);
    chunksRef.current = [];
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const video = videoRef.current;
        video.srcObject = stream;
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (e) => {
          chunksRef.current.push(e.data);
        };
        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: "video/mp4" });
          const url = URL.createObjectURL(blob);
          setVideoURL(url);
        };
        mediaRecorderRef.current.start();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function stopRecording() {
    setRecording(false);
    setShowCameraPreview(false);
    mediaRecorderRef.current.stop();
    mediaRecorderRef.current.oninactive = () => {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      // stop the camera stream
      stream.getTracks().forEach(track => track.stop());
    };
  }

  return (
    <div className="popup">
      <h2>This is a Popup</h2>
      {videoURL ? (
        <video src={videoURL} controls />
      ) : (
        <>
          <p>Popup content goes here.</p>
          {recording ? (
            <button onClick={stopRecording}>Stop Recording</button>
          ) : (
            <button onClick={startRecording}>Start Recording</button>
          )}
          {showCameraPreview && <video ref={videoRef} autoPlay muted />}
        </>
      )}
      <button onClick={props.onClose}>Close</button>
    </div>
  );
}

export default Popup;

