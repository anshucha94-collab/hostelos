"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-black p-6 border-r border-zinc-800">
      <h1 className="text-4xl font-bold text-white mb-10">
        HostelOS
      </h1>

      <nav className="space-y-4">
        <Link href="/" className="block text-white">
          Dashboard
        </Link>

        <Link href="/students" className="block text-white">
          Students
        </Link>

        <Link href="/scanner" className="block text-green-400">
          Security Hub
        </Link>

        <Link href="/entrylogs" className="block text-white">
          Entry Logs
        </Link>
      </nav>
    </div>
  );
}