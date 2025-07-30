"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    age: "",
    role: "",
  });
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const loginRes = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
        age:Number(formData.age),
        role: formData.role,
      });

      if (loginRes?.ok) {
        router.push("/dashboard");
      } else {
        console.error("Login after registration failed", loginRes);
      }
    } else {
      const data = await res.json();
      console.error("Registration failed:", data.error);
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};

  return (
    <main className="min-h-screen flex items-center justify-center  px-4">
      <div className="backdrop-blur-lg bg-white/5 border border-white/10 p-6 rounded-xl shadow-xl w-full max-w-sm space-y-6 text-white">
        <div className="flex items-center justify-center gap-2">
          <LogIn className="text-blue-400 w-5 h-5" />
          <h2 className="text-xl font-semibold text-blue-300">
            Login to CrewBoard
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-sm">
          <input
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            type="email"
            required
            placeholder="Email"
            className="bg-white/10 border border-white/20 placeholder-gray-300 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
            type="password"
            required
            placeholder="Password"
            className="bg-white/10 border border-white/20 placeholder-gray-300 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={formData.age}
            onChange={(e) => {
              setFormData({ ...formData, age: e.target.value });
            }}
            type="number"
            required
            placeholder="Age"
            className="bg-white/10 border border-white/20 placeholder-gray-300 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={formData.role}
            required
            onChange={(e) => {
              setFormData({ ...formData, role: e.target.value });
            }}
            className="appearance-none bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option disabled value="">
              Select Role
            </option>
            <option value={"admin"} className="bg-gray-900 text-white">
              Admin
            </option>
            <option value={"manager"} className="bg-gray-900 text-white">
              Manager
            </option>
            <option value={"worker"} className="bg-gray-900 text-white">
              Worker
            </option>
          </select>

          <button
            type="submit"
            className="py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition shadow-sm"
          >
            Submit
          </button>
        </form>
        <div className="flex items-center justify-center text-sm">
          <p>Already Registered? <Link href="/login" className="text-blue-400 hover:underline">Login</Link></p>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-400">
          <div className="flex-grow h-px bg-white/20" />
          OR
          <div className="flex-grow h-px bg-white/20" />
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white text-black text-sm font-medium rounded-md shadow hover:bg-gray-200 transition"
        >
          <FcGoogle className="text-xl" />
          Sign in with Google
        </button>

        <p className="text-center text-xs text-gray-400 pt-1">
          You’ll be redirected to your dashboard after login.
        </p>
      </div>
    </main>
  );
}
