import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/user/signin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className="w-full max-w-105 rounded-xl bg-white p-8 shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
        <div className="mb-6 text-center">
          <h1 className="text-[1.75rem]">Welcome Back</h1>
          <p className="mt-1 text-[0.9rem] text-slate-500">
            Signin to access your blogs
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-2.5 text-center text-[0.85rem] text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
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
              placeholder="Enter your email"
              className="rounded-lg border border-indigo-100 px-3 py-2.5 text-[0.95rem] outline-none transition-all focus:border-indigo-600 focus:shadow-[0_0_0_2px_rgba(99,102,241,0.2)]"
              required
            />
          </div>

          <div className="mb-4 flex flex-col">
            <label
              htmlFor="password"
              className="mb-1.5 text-[0.85rem] text-slate-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="rounded-lg border border-indigo-100 px-3 py-2.5 text-[0.95rem] outline-none transition-all focus:border-indigo-600 focus:shadow-[0_0_0_2px_rgba(99,102,241,0.2)]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full cursor-pointer rounded-lg border-none bg-indigo-600 p-3 text-base font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="mt-4 text-center text-[0.85rem] text-slate-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:underline"
            >
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
