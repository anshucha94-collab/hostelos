"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  DoorOpen,
  ClipboardList,
  ShieldAlert,
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
    <div className="w-64 h-screen bg-zinc-950 border-r border-zinc-800 p-6">
      <h1 className="text-3xl font-bold text-white mb-10">
        HostelOS
      </h1>

      <nav className="space-y-4">
        <Link
          href="/"
          className="flex items-center gap-3 text-zinc-300 hover:text-white"
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/students"
          className="flex items-center gap-3 text-zinc-300 hover:text-white"
        >
          <Users size={20} />
          <span>Students</span>
        </Link>

        <Link
          href="/rooms"
          className="flex items-center gap-3 text-zinc-300 hover:text-white"
        >
          <DoorOpen size={20} />
          <span>Rooms</span>
        </Link>

        <Link
          href="/entrylogs"
          className="flex items-center gap-3 text-zinc-300 hover:text-white"
        >
          <ClipboardList size={20} />
          <span>Entry Logs</span>
        </Link>

        <div className="flex items-center gap-3 text-zinc-300">
          <ShieldAlert size={20} />
          <span>Security</span>
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