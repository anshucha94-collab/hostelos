"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  ClipboardList,
  ShieldAlert,
  ScanLine,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem(
      "hostel-admin"
    );

    router.push("/login");
  };

  return (
    <div className="w-72 h-screen bg-black border-r border-zinc-800 p-6 flex flex-col justify-between">
      <div>
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white">
            HostelOS
          </h1>

          <p className="text-zinc-500 mt-2">
            Smart Hostel Monitoring
          </p>
        </div>

        <nav className="space-y-3">
          <Link
            href="/"
            className="flex items-center gap-4 bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-4 rounded-2xl transition"
          >
            <LayoutDashboard size={22} />

            <span className="text-lg">
              Dashboard
            </span>
          </Link>

          <Link
            href="/students"
            className="flex items-center gap-4 bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-4 rounded-2xl transition"
          >
            <Users size={22} />

            <span className="text-lg">
              Students
            </span>
          </Link>

          <Link
            href="/scanner"
            className="flex items-center gap-4 bg-green-500/10 border border-green-500 hover:bg-green-500/20 text-green-400 px-5 py-4 rounded-2xl transition"
          >
            <ScanLine size={22} />

            <span className="text-lg font-semibold">
              Security Hub
            </span>
          </Link>

          <Link
            href="/entrylogs"
            className="flex items-center gap-4 bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-4 rounded-2xl transition"
          >
            <ClipboardList size={22} />

            <span className="text-lg">
              Entry Logs
            </span>
          </Link>

          <div className="flex items-center gap-4 bg-zinc-900 text-yellow-400 px-5 py-4 rounded-2xl">
            <ShieldAlert size={22} />

            <span className="text-lg">
              Security Active
            </span>
          </div>
        </nav>
      </div>

      <button
        onClick={logout}
        className="flex items-center justify-center gap-3 bg-red-500/20 text-red-400 px-5 py-4 rounded-2xl hover:bg-red-500/30 transition w-full"
      >
        <LogOut size={22} />

        <span className="text-lg">
          Logout
        </span>
      </button>
    </div>
  );
}