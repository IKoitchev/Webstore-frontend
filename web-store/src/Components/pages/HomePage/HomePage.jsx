import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../Navbar/Navbar";
import "./HomePage.css";
function HomePage() {
  return (
    <div>
      <NavBar />
      <div className="hero-container">
        <video src="/videos/video-1.mp4" autoPlay loop muted />
        <h1>Welcome to the Store! </h1>
        <p>
          {/* <Link to="/"></Link> */}
          Start shopping now!
        </p>
        <div className="hero-btns"></div>
      </div>
    </div>
  );
}

export default HomePage;
