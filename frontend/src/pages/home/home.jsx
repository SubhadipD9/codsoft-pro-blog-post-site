import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Evaluate Your Ideas with Mind</title>
      </Helmet>
      <div className="flex min-h-[calc(100vh-10px)] flex-col justify-between font-[Montserrat,sans-serif]">
        {/* Main Hero Section */}
        <main className="mx-auto flex max-w-200 flex-1 flex-col items-center justify-center px-5 py-20 text-center md:py-15">
          <h1 className="mb-6 text-[32px] leading-tight font-medium text-black sm:text-[40px] md:text-[64px]">
            Great
            <br />
            stories & ideas
          </h1>
          <p className="mb-10 text-[14px] text-[#333] sm:text-base md:text-[18px]">
            A place to read, write, and display your understanding to the world
          </p>

          {/* 'Get Started' usually points to Signup or the Blog Feed */}
          <Link
            to="/blogs"
            className="inline-block rounded-full bg-black px-6 py-3 text-base font-medium text-white no-underline transition-colors hover:bg-[#333]"
          >
            Start Reading
          </Link>
        </main>

        {/* Footer Section */}
        <footer className="w-full border-t border-black/10 px-4 py-5">
          <div className="mx-auto flex max-w-240 justify-center text-sm">
            <p className="m-0 flex items-center gap-2.5 text-[#666]">
              Created by ©Subhadip Bag.
              <a
                href="https://github.com/subhadipD9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                {/* I used a standard GitHub icon URL here. You can also save this image to your public folder. */}
                <img
                  src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                  alt="GitHub"
                  className="block h-6 w-6 opacity-70 transition-opacity hover:opacity-100"
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
