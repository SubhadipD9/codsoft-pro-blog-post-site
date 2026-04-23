import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [username, setUsername] = useState(() =>
    localStorage.getItem("username"),
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setUsername(null);
    navigate("/blogs");
  };

  const initial = username ? username.charAt(0).toUpperCase() : "U";

  const baseNavLinkClass =
    "text-[0.95rem] font-medium text-gray-500 no-underline transition-colors hover:text-indigo-600";

  const primaryNavLinkClass =
    "rounded-md bg-gray-900 px-4 py-2 text-[0.95rem] font-medium text-white no-underline transition-transform hover:-translate-y-px";

  return (
    <header className="sticky top-0 z-50 h-17.5 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto grid h-full max-w-300 grid-cols-3 items-center px-6">
        {/* LEFT (mobile menu button) */}
        <div className="flex items-center">
          {/* ✅ Changed md:hidden to lg:hidden */}
          <button
            className="flex h-5 w-7.5 flex-col justify-between border-none bg-transparent p-0 lg:hidden"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="h-0.5 w-full rounded bg-gray-900"></span>
            <span className="h-0.5 w-full rounded bg-gray-900"></span>
            <span className="h-0.5 w-full rounded bg-gray-900"></span>
          </button>
        </div>

        {/* CENTER (logo) */}
        <div className="flex justify-center">
          <Link
            to="/blogs"
            className="font-serif text-3xl font-extrabold text-gray-900 no-underline"
          >
            Mind
          </Link>
        </div>

        {/* RIGHT (nav items) */}
        <div className="flex justify-end">
          {/* ✅ Changed all md: to lg:, added gap-4 for mobile spacing */}
          <nav
            className={`${
              isMobileOpen ? "flex gap-4" : "hidden"
            } absolute top-17.5 left-0 w-full flex-col items-start bg-white p-4 shadow-md lg:static lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-6 lg:bg-transparent lg:p-0 lg:shadow-none`}
          >
            {username ? (
              <>
                <Link to="/blogs" className={baseNavLinkClass}>
                  Home
                </Link>

                <Link to="/dashboard" className={baseNavLinkClass}>
                  Dashboard
                </Link>

                <Link to="/create" className={primaryNavLinkClass}>
                  Create
                </Link>

                {/* User Dropdown */}
                {/* ✅ Changed all md: to lg: */}
                <div className="group relative mt-3 w-full cursor-pointer lg:mt-0 lg:ml-4 lg:flex lg:h-full lg:w-auto lg:items-center">
                  <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-[1.1rem] font-bold text-white lg:flex">
                    {initial}
                  </div>

                  <div className="w-full rounded-xl border border-gray-200/50 bg-white p-2 lg:invisible lg:absolute lg:right-0 lg:top-full lg:w-55 lg:translate-y-2 lg:opacity-0 lg:shadow-lg lg:transition-all lg:duration-200 lg:group-hover:visible lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                    <div className="mb-2 border-b border-gray-200/50 p-3 text-[0.85rem] text-gray-500">
                      Signed in as <br />
                      <strong className="mt-0.5 block text-base text-gray-900">
                        {username}
                      </strong>
                    </div>

                    <Link
                      to="/profile"
                      className="flex w-full rounded-md px-3 py-2.5 text-left text-[0.95rem] text-gray-900 no-underline transition-colors hover:bg-gray-100"
                    >
                      Profile
                    </Link>

                    <Link
                      to="/settings"
                      className="flex w-full rounded-md px-3 py-2.5 text-left text-[0.95rem] text-gray-900 no-underline transition-colors hover:bg-gray-100"
                    >
                      Settings
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="mt-1 flex w-full cursor-pointer rounded-md border-none bg-transparent px-3 py-2.5 text-left text-[0.95rem] text-red-600 transition-colors hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
