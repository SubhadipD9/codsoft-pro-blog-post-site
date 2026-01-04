import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Evaluate Your Ideas with Mind</title>
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
          <Link to="/blogs" className="hero-btn">
            Start Reading
          </Link>
        </main>

        {/* Footer Section */}
        <footer>
          <div className="footer-container">
            <p>
              Created by ©Subhadip Bag.
              <a
                href="https://github.com/subhadipD9"
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
              >
                {/* I used a standard GitHub icon URL here. You can also save this image to your public folder. */}
                <img
                  src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                  alt="GitHub"
                  className="github-logo"
                />
              </a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
