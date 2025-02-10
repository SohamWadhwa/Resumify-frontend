import React from "react";
import Navbar from "../Components/Navbar";
import "../styles/Home.css";
import "../styles/Aboutus.css";

export default function Aboutme() {
    return (
        <div className="container-aboutus">
            <Navbar/>
            <div className="blob blob1"></div>
            <div className="blob blob2"></div>
            <div className="aboutme-container">
                <div className="aboutme">
                    <h1>About Us</h1>
                    <p>Welcome to <b>Resumify</b>, your go-to platform for smart resume analysis and optimization. We aim to help job seekers refine their resumes with AI-powered insights, ensuring they stand out in today's competitive job market.</p>
                    <p>At <b>Resumify</b>, we believe that every resume tells a story, and we’re here to make sure yours leaves a lasting impression. Our platform extracts key details from resumes and provides instant, AI-driven feedback to improve clarity, relevance, and structure.</p>
                    <p>Whether you're a fresh graduate or an experienced professional, <b>Resumify</b> streamlines the process of crafting a compelling resume, helping you land your dream job with confidence.</p>
                    <p>Join us in redefining the way resumes are built—one optimized resume at a time!</p>
                    <div>PortFolio: <a href="s-w-portfolio.netlify.app" target="blank">SohamWadhwa</a></div>
                </div>
            </div>
        </div>
    );
}