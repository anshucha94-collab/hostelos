"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const login = () => {
    if (
      email === "admin@hostelos.com" &&
      password === "admin123"
    ) {
      localStorage.setItem(
        "hostel-admin",
        "true"
      );

      router.push("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
        <h1 className="text-4xl font-bold">
          HostelOS
        </h1>

        <p className="text-zinc-400 mt-2">
          Admin Authentication
        </p>

        <div className="mt-8 space-y-5">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 outline-none"
          />

          <button
            onClick={login}
            className="w-full bg-white text-black py-4 rounded-xl font-semibold hover:opacity-80 transition"
          >
            Login
          </button>
        </div>

        <div className="mt-6 text-sm text-zinc-500">
          Demo Login:
          <br />
          admin@hostelos.com
          <br />
          admin123
        </div>
      </div>
    </div>
  );
}