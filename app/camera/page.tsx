// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import Link from "next/link";
// import { redirect } from 'next/navigation'; 
// import {useInformation} from "../../context/InformationContext"; 

// export default function CameraPage() {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [photo, setPhoto] = useState<string | null>(null);
//   const [uploadStatus, setUploadStatus] = useState<string | null>(null); 

//   const { context, setContext } = useInformation(); 

//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then((stream) => {
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       })
//       .catch((err) => console.error('Camera error:', err));
//   }, []);

//   const takePhoto = () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     if (video && canvas) {
//       const context = canvas.getContext('2d');
//       if (context) {
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//         context.drawImage(video, 0, 0);
//         const dataUrl = canvas.toDataURL('image/jpeg');
//         setPhoto(dataUrl);
//       }
//     }
//   };

//   const uploadPhoto = async () => {
//     if (!photo) {
//       setUploadStatus("Please take a photo first.");
//       return;
//     }

//     const blob = await (await fetch(photo)).blob();
//     const formData = new FormData();
//     formData.append('input_image', blob, 'photo.jpg');
//     formData.append('buid', context.buid);

//     setUploadStatus("Uploading...");

//     try {
//       const res = await fetch('https://face-service-143797183460.us-east1.run.app/compare/', {
//         method: 'POST',
//         body: formData,
//       });
//       const data = await res.json();
//       if (data.success) {
//         setUploadStatus(
//           `Matched file: ${data.matched_file || "None"}, Similarity: ${data.similarity?.toFixed(4)}, Match: ${data.match ? "Yes" : "No"}`
//         );
//         redirect(`/attemdance-recorded-confirmation`); 
//       } else {
//         setUploadStatus(data.reason || 'Face not detected.');
//       }
//     } catch (err) {
//       setUploadStatus('Upload failed, please try again.');
//       console.error('Upload error:', err);
//     }
//   };

//   return (
//     <main className="flex flex-col items-center gap-4 p-6">
//       <video ref={videoRef} autoPlay className="w-full max-w-md rounded-lg" />
//       <canvas ref={canvasRef} style={{ display: 'none' }} />

//       <button
//         onClick={takePhoto}
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         Take Photo
//       </button>

//       {photo && (
//         <>
//           <img src={photo} alt="Captured" className="w-full max-w-md rounded shadow" />
//           <button
//             onClick={uploadPhoto}
//             className="bg-green-600 text-white px-4 py-2 rounded"
//           >
//             Upload to Cloud Run & Compare
//           </button>
//         </>
//       )}

//       {uploadStatus && <p>{uploadStatus}</p>}

//       <Link
//         href={`/camera-usage-consent-form`}
//         className="inline-block text-white bg-blue-700 hover:bg-sky-600 active:bg-sky-900 active:translate-y-[0.3vh] transform font-medium rounded-lg text-sm px-5 py-2.5 my-5"
//       >
//         Go Back
//       </Link>
//     </main>
//   );
// }


'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from "next/link";
import { redirect } from 'next/navigation'; 
import { useInformation } from "../../context/InformationContext"; 

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null); 

  const { context, setContext } = useInformation(); 

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error('Camera error:', err));
  }, []);

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context2d = canvas.getContext('2d');
      if (context2d) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context2d.drawImage(video, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setPhoto(dataUrl);
      }
    }
  };

  const uploadPhoto = async () => {
    if (!photo) {
      setUploadStatus("Please take a photo first.");
      return;
    }
    if (!context.buid) {
      setUploadStatus("No BUID found. Please go back and enter your BU ID.");
      return;
    }

    const blob = await (await fetch(photo)).blob();
    const formData = new FormData();
    formData.append('input_image', blob, 'photo.jpg');
    formData.append('buid', context.buid);

    setUploadStatus("Uploading...");

    try {
      const res = await fetch('https://face-service-143797183460.us-east1.run.app/compare/', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
        if (data.success) {
        setUploadStatus(
          `Reference Image: ${data.db_image || "None"}, Similarity: ${data.similarity?.toFixed(4)}, Match: ${data.match ? "Yes ✅" : "No ❌"}`
        );
        if (data.match) {
        // 跳转到结果页，这里推荐用 setTimeout 让用户能看到状态
        setTimeout(() => {
          redirect(`/attendance-recorded-confirmation`);
        }, 15000);
        }
      } else {
        setUploadStatus(data.reason || data.message || 'Face not detected or verification failed.');
      }
    }
     catch (err) {
      setUploadStatus('Upload failed, please try again.');
      console.error('Upload error:', err);
    }
  
  };

  return (
    <main className="flex flex-col items-center gap-4 p-6">
      <video ref={videoRef} autoPlay className="w-full max-w-md rounded-lg" />
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <button
        onClick={takePhoto}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Take Photo
      </button>

      {photo && (
        <>
          <img src={photo} alt="Captured" className="w-full max-w-md rounded shadow" />
          <button
            onClick={uploadPhoto}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Upload & Face Verify
          </button>
        </>
      )}

      {uploadStatus && <p>{uploadStatus}</p>}

      <Link
        href={`/camera-usage-consent-form`}
        className="inline-block text-white bg-blue-700 hover:bg-sky-600 active:bg-sky-900 active:translate-y-[0.3vh] transform font-medium rounded-lg text-sm px-5 py-2.5 my-5"
      >
        Go Back
      </Link>
    </main>
  );
}