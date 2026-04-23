import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import hideIcon from "../../assets/Hide-Image.png";
import showIcon from "../../assets/Show-Image.png";

const API_URL = import.meta.env.VITE_API_URL;

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/user/signup`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Helmet>
        <title>Signup</title>
      </Helmet>

      <div className="w-full max-w-105 rounded-xl bg-white p-8 shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
        <div className="mb-6 text-center">
          <h1 className="text-[1.75rem]">Signup</h1>
          <p className="mt-1 text-[0.9rem] text-slate-500">
            Signup to post blogs
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-2.5 text-center text-[0.85rem] text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup}>
          <div className="mb-4 flex flex-col">
            <label
              htmlFor="username"
              className="mb-1.5 text-[0.85rem] text-slate-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="johndoe21"
              className="rounded-lg border border-indigo-100 px-3 py-2.5 text-[0.95rem] outline-none transition-all focus:border-indigo-600 focus:shadow-[0_0_0_2px_rgba(99,102,241,0.2)]"
              required
            />
          </div>

          <div className="mb-4 flex flex-col">
            <label
              htmlFor="email"
              className="mb-1.5 text-[0.85rem] text-slate-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@email.com"
              className="rounded-lg border border-indigo-100 px-3 py-2.5 text-[0.95rem] outline-none transition-all focus:border-indigo-600 focus:shadow-[0_0_0_2px_rgba(99,102,241,0.2)]"
              required
            />
          </div>

          {/* Password with toggle */}
          <div className="mb-4 flex flex-col">
            <label
              htmlFor="password"
              className="mb-1.5 text-[0.85rem] text-slate-700"
            >
              Password
            </label>

            <div className="relative flex items-center">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-indigo-100 px-3 py-2.5 pr-12 text-[0.95rem] outline-none transition-all focus:border-indigo-600 focus:shadow-[0_0_0_2px_rgba(99,102,241,0.2)]"
                required
              />

              <button
                type="button"
                className="absolute right-3 flex items-center justify-center cursor-pointer border-none bg-transparent p-1 transition-opacity hover:opacity-70"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <img
                    src={hideIcon}
                    alt="Hide"
                    className="w-5 h-5 object-contain"
                  />
                ) : (
                  <img
                    src={showIcon}
                    alt="Show"
                    className="w-5 h-5 object-contain"
                  />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-3 w-full cursor-pointer rounded-lg border-none bg-indigo-600 p-3 text-base font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="mt-4 text-center text-[0.85rem] text-slate-600">
            Already have an account!{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:underline"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
