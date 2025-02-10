import { useState, useRef, useLayoutEffect, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navbar from "../Components/Navbar";
import HalfCircleProgress from "../Components/atsprogress";
import "../styles/Home.css";
const apiUrl = import.meta.env.VITE_API_URL; 
import Loader from "../Components/Loading";
export default function Home() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [modalOrigin, setModalOrigin] = useState("center center");
  const [analysisText, setAnalysisText] = useState("");
  const [scoreText, setScoreText] = useState("");

  // Refs for the upload box and the modal.
  const uploadBoxRef = useRef(null);
  const modalRef = useRef(null);

  const handleFileChange = (e) => { 
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
  
    setOverlayOpen(true);
    setIsUploading(true);
  
    const formData = new FormData();
    formData.append("resume", file);
  
    fetch(`${apiUrl}/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setIsUploading(false);
        console.log(data);
        if (data.analysisResult) {
          setAnalysisText(data.analysisResult); // Display the analyzed text
          setScoreText(data.atsScore);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsUploading(false);
      });
  };
  
  // function updateAnalysisText(chunk) {
  //   setAnalysisText((prevText) => prevText + chunk);
  // }

  // useEffect(() => {
  //   if (!isUploading && overlayOpen) {

  //   }
  // }, [isUploading, overlayOpen]);

  // function analyzeResume() {
  //   const eventSource = new EventSource("http://localhost:5000/analyze-resume"); // Create SSE connection
  //   eventSource.onopen = () => {
  //     console.log("Connection opened");
  //   };
  //   eventSource.onmessage = function (event) {
  //     const data = JSON.parse(event.data);
  //     updateAnalysisText(data.text);
  //   };

  //   eventSource.onerror = function (error) {
  //     console.error("Error:", error);
  //     eventSource.close();
  //   };

  //   // Send the resume text to the server for analysis
  //   // fetch('http://localhost:5000/analyze-resume', {
  //   //     method: 'POST',
  //   //     headers: {
  //   //         'Content-Type': 'application/json'
  //   //     },
  //   //     body: JSON.stringify({})
  //   // });
  // }

  // Use useLayoutEffect to compute the transform origin as soon as the modal is rendered.
  useLayoutEffect(() => {
    if (overlayOpen && modalRef.current && uploadBoxRef.current) {
      // Get the modal's bounding rect.
      const modalRect = modalRef.current.getBoundingClientRect();
      // Get the upload box center in viewport coordinates.
      const uploadRect = uploadBoxRef.current.getBoundingClientRect();
      const uploadCenterX = uploadRect.left + uploadRect.width / 2;
      const uploadCenterY = uploadRect.top + uploadRect.height / 2;
      // Compute the transform origin relative to the modal's top left.
      const originX = uploadCenterX - modalRect.left;
      const originY = uploadCenterY - modalRect.top;
      setModalOrigin(`${originX}px ${originY}px`);
    }
  }, [overlayOpen]);

  const closeOverlay = () => {
    // Optionally, add an exit animation before closing.
    setOverlayOpen(false);
  };

  return (
    <div className="home">
      <Navbar />
      {/* Blur the main content when overlay is open */}
      <div className={`main-content ${overlayOpen ? "blurred" : ""}`}>
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="hero-container">
          <div className="title-container">
            <div className="heading">
              <h5>RESUME ANALYSER</h5>
            </div>
            <div className="title">
              <h1>Is your resume good enough?</h1>
            </div>
            <div className="desc">
              <p>
                Use AI to enhance your resume and get noticed by recruiters.
              </p>
            </div>
          </div>
          <div className="line"></div>
          <div id="drop-section">
            <div className={`upload-wrapper ${isUploading ? "uploading" : ""}`}>
              <form
                onSubmit={handleSubmit}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="upload-box"
                ref={uploadBoxRef} // Reference to measure the upload box
              >
                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileInput"
                />
                <label htmlFor="fileInput" className="file-label">
                  {file ? (
                    file.name
                  ) : (
                    <>
                      Drag & drop your resume <br /> PDF & DOCX only
                    </>
                  )}
                </label>
                <button
                  type="submit"
                  className="upload-button"
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Upload Your Resume"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay with modal */}
      {overlayOpen && (
        <div className="overlay">
          <div
            className="modal"
            ref={modalRef}
            // Apply the computed transform origin so that the modal scales from the upload box.
            style={{ transformOrigin: modalOrigin }}
          >
            <button className="close-button" onClick={closeOverlay}>
              ×
            </button>
            <div className="modal-content">
              <div>
                {isUploading ? (
                  <Loader />
                ) : (
                  <div className="upload-content">
                    <div className="ats-score">
                      <HalfCircleProgress
                        progress={scoreText}
                        color="#10b981"
                        size={120}
                        strokeWidth={12}
                        label="ATS SCORE"
                        percentageStyle={{ fontSize: '24px' }} 
                      />
                    </div>
                    <div className="resume-content">
                      <h3>AI Analysis</h3>
                      <div className="markdown-container">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{analysisText}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
