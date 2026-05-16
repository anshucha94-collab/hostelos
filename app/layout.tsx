"use client";

import "./globals.css";

import { useEffect, useState } from "react";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const pathname = usePathname();

  const [mounted, setMounted] =
    useState(false);

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  useEffect(() => {
    setMounted(true);

    const admin =
      localStorage.getItem("hostel-admin");

    if (admin) {
      setIsLoggedIn(true);
    }

    if (!admin && pathname !== "/login") {
      router.push("/login");
    }
  }, [pathname, router]);

  if (!mounted) {
    return (
      <html lang="en">
        <body />
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="bg-black text-white">
        {pathname === "/login" ? (
          children
        ) : isLoggedIn ? (
          <div className="flex">
            <Sidebar />

            <main className="flex-1">
              {children}
            </main>
          </div>
        ) : null}
      </body>
    </html>
  );
}