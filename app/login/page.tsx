"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

export default function LoginPage() {
  const router =
    useRouter();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleLogin =
    async () => {
      try {
        const response =
          await fetch(
            "https://hostelos-ld1n.onrender.com/login",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                username,
                password,
              }),
            }
          );

        const data =
          await response.json();

        if (!data.success) {
          setError(
            "Invalid credentials"
          );

          return;
        }

        localStorage.setItem(
          "hostel-token",
          data.token
        );

        router.push("/");
      } catch (error) {
        console.log(error);

        setError(
          "Login failed"
        );
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 w-full max-w-md">
        <h1 className="text-4xl font-bold">
          HostelOS Login
        </h1>

        <p className="text-zinc-400 mt-2">
          Secure admin access
        </p>

        <div className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 outline-none"
          />
        </div>

        {error && (
          <p className="text-red-400 mt-4">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-green-500 hover:bg-green-600 transition-all text-white py-4 rounded-xl mt-8 font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}