"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem(
      "hostel-admin"
    );

    router.push("/login");
  };

  return (
    <div className="w-64 h-screen bg-zinc-950 border-r border-zinc-800 p-6">
      <h1 className="text-3xl font-bold text-white mb-10">
        HostelOS
      </h1>

      <nav className="space-y-4">
        <Link
          href="/"
          className="block text-zinc-300 hover:text-white bg-zinc-900 px-4 py-3 rounded-xl"
        >
          Dashboard
        </Link>

        <Link
          href="/students"
          className="block text-zinc-300 hover:text-white bg-zinc-900 px-4 py-3 rounded-xl"
        >
          Students
        </Link>

        <Link
          href="/scanner"
          className="block text-green-400 bg-green-500/10 border border-green-500 px-4 py-3 rounded-xl"
        >
          Security Hub
        </Link>

        <Link
          href="/entrylogs"
          className="block text-zinc-300 hover:text-white bg-zinc-900 px-4 py-3 rounded-xl"
        >
          Entry Logs
        </Link>

        <div className="text-yellow-400 bg-zinc-900 px-4 py-3 rounded-xl">
          Security Active
        </div>

        <button
          onClick={logout}
          className="mt-10 bg-red-500/20 text-red-400 px-4 py-3 rounded-xl w-full hover:bg-red-500/30 transition"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}