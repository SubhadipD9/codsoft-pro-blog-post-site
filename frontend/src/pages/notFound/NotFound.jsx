import React from "react";

export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 p-4 font-sans">
      <div className="text-center max-w-md">
        {/* Vibrant Gradient Text with a subtle bounce */}
        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-indigo-500 to-purple-600 drop-shadow-sm animate-pulse">
          404
        </h1>

        <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
          Uh-oh! You're off the map.
        </h2>

        <p className="mt-4 text-lg text-gray-500">
          We can't seem to find the page you're looking for. It might have been
          removed, renamed, or is temporarily unavailable.
        </p>

        {/* Animated Call-to-Action Button */}
        <div className="mt-10">
          <a
            href="/"
            className="relative inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 bg-indigo-600 rounded-full hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 focus:ring-offset-white shadow-md hover:shadow-xl hover:-translate-y-1"
          >
            Take Me Home
          </a>
        </div>
      </div>
    </div>
  );
};
