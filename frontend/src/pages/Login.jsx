import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

const API = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.email || !form.password) {
      return setError("All fields are required.");
    }

    setLoading(true);

    try {
      const res = await axios.post(`${API}/api/auth/login`, form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const { displayName, email } = result.user;

      const res = await axios.post(`${API}/api/auth/google`, {
        name: displayName,
        email,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError("Google login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center px-4 relative">

      {/* Glow Background */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-80px] right-[12%] w-72 h-72 rounded-full bg-cyan-400 blur-3xl opacity-40"></div>

        <div className="absolute left-[-80px] top-1/2 w-52 h-52 rounded-full bg-pink-400 blur-3xl opacity-40"></div>

        <div className="absolute bottom-[-70px] right-[18%] w-64 h-64 rounded-full bg-purple-500 blur-3xl opacity-40"></div>

        <div className="absolute bottom-[-80px] left-[10%] w-48 h-48 rounded-full bg-cyan-500 blur-3xl opacity-40"></div>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">

        <div className="backdrop-blur-2xl bg-white/5 border border-cyan-300/30 rounded-[32px] px-8 py-10 shadow-2xl shadow-cyan-500/10">

          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-6xl font-extrabold text-white tracking-tight">
              Guide<span className="text-cyan-400">X</span>
            </h1>

            <p className="text-slate-300 mt-3 text-sm tracking-wide">
              Welcome back — sign in to continue
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/40 text-red-300 rounded-xl px-4 py-3 mb-5 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-slate-200 text-sm font-medium mb-2 block">
                Email Address
              </label>

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="you@example.com"
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all duration-300"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-slate-200 text-sm font-medium mb-2 block">
                Password
              </label>

              <div className="relative">
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 pr-16 transition-all duration-300"
                />

                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-3.5 text-slate-300 hover:text-cyan-300 text-sm"
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:scale-[1.02] text-white font-semibold py-3 rounded-2xl transition-all duration-300 shadow-xl shadow-cyan-500/30"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/20"></div>

            <span className="px-4 text-slate-400 text-sm">
              or continue with
            </span>

            <div className="flex-1 border-t border-white/20"></div>
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full bg-white/95 hover:bg-white text-slate-900 font-semibold py-3 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>

            Continue with Google
          </button>

          {/* Footer */}
          <p className="text-center text-slate-300 text-sm mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;