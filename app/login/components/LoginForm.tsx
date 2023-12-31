"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({ email: "", password: "" });

  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  async function handleLogin() {
    try {
      if (!input.email || !input.password) return;
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/login`,
        input,
        {
          withCredentials: true,
        }
      );
      router.push("/dashboard/home");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col">
      <label htmlFor="email" className="text-slate-200 mb-1 text-lg">
        Email
      </label>
      <input
        type="email"
        id="email"
        value={input.email}
        onChange={handleChange}
        name="email"
        required
        className="mb-3.5 py-2 px-4 rounded bg-[#262a37] border border-slate-600 text-slate-200 outline-none"
        placeholder="Email"
      />
      <label htmlFor="password" className="text-slate-200 mb-1 text-lg">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        required
        value={input.password}
        onChange={handleChange}
        className="py-2 px-4 rounded bg-[#262a37] border border-slate-600 text-slate-200 outline-none"
        placeholder="Password"
      />
      <button
        onClick={handleLogin}
        disabled={loading}
        className={`rounded-md px-5 py-1 bg-emerald-500 text-slate-100 mt-7 max-w-fit${
          loading ? " opacity-60" : ""
        }`}
      >
        {loading ? "Logging..." : "Login"}
      </button>
    </div>
  );
}
