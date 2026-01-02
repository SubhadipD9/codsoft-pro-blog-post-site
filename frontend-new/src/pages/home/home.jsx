import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Mind</title>
      </Helmet>
      <div className="home-container">
        {/* Main Hero Section */}
        <main className="hero">
          <h1>
            Great
            <br />
            stories & ideas
          </h1>
          <p>
            A place to read, write, and display your understanding to the world
          </p>

          {/* 'Get Started' usually points to Signup or the Blog Feed */}
          <Link to="/signup" className="hero-btn">
            Start Reading
          </Link>
        </main>

        {/* Footer Section */}
        <footer>
          <div className="footer-container">
            <p>Created by Subhadip. Inspired ❤️ by Medium</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
