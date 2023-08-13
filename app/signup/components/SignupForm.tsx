"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  async function handleSignup() {
    try {
      if (!input.email || !input.password || !input.full_name) return;
      setLoading(true);
      await axios.post("http://localhost:8080/signup", input, {
        withCredentials: true,
      });
      router.push("/dashboard/home");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col">
      <label htmlFor="fullName" className="text-slate-200 mb-1">
        Full Name
      </label>
      <input
        type="text"
        id="fullName"
        value={input.full_name}
        onChange={handleChange}
        name="full_name"
        className="mb-3.5 py-2 px-4 rounded bg-[#262a37] border border-slate-600 text-slate-200 outline-none"
        placeholder="Full Name"
      />
      <label htmlFor="email" className="text-slate-200 mb-1">
        Email
      </label>
      <input
        type="email"
        id="email"
        value={input.email}
        onChange={handleChange}
        name="email"
        className="mb-3.5 py-2 px-4 rounded bg-[#262a37] border border-slate-600 text-slate-200 outline-none"
        placeholder="Email"
      />
      <label htmlFor="password" className="text-slate-200 mb-1">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        value={input.password}
        onChange={handleChange}
        className="py-2 px-4 rounded bg-[#262a37] border border-slate-600 text-slate-200 outline-none"
        placeholder="Password"
      />
      <button
        onClick={handleSignup}
        disabled={loading}
        className={`rounded-md px-5 py-1 bg-emerald-500 text-slate-100 mt-7 max-w-fit${
          loading ? " opacity-60" : ""
        }`}
      >
        {loading ? "Signing..." : "Signup"}
      </button>
    </div>
  );
}
