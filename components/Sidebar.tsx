"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("hostel-token");

    router.push("/login");
  };

  return (
    <div className="w-72 min-h-screen bg-black border-r border-zinc-800 p-8">
      <h1 className="text-5xl font-bold text-white mb-12">
        HostelOS
      </h1>

      <nav className="space-y-5">
        <Link
          href="/"
          className="block bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-4 rounded-2xl"
        >
          Dashboard
        </Link>

        <Link
          href="/students"
          className="block bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-4 rounded-2xl"
        >
          Students
        </Link>

        <Link
          href="/scanner"
          className="block bg-green-500/10 border border-green-500 text-green-400 px-5 py-4 rounded-2xl"
        >
          Security Hub
        </Link>

        <Link
          href="/entrylogs"
          className="block bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-4 rounded-2xl"
        >
          Entry Logs
        </Link>

        <div className="bg-zinc-900 text-yellow-400 px-5 py-4 rounded-2xl">
          Security Active
        </div>

        <button
          onClick={logout}
          className="mt-10 bg-red-500/20 text-red-400 px-5 py-4 rounded-2xl w-full hover:bg-red-500/30 transition"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}