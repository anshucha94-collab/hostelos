"use client";

import "./globals.css";

import Sidebar from "@/components/Sidebar";

import {
  useEffect,
} from "react";

import {
  useRouter,
  usePathname,
} from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router =
    useRouter();

  const pathname =
    usePathname();

  useEffect(() => {
    const token =
      localStorage.getItem(
        "hostel-token"
      );

    const publicRoutes = [
      "/login",
    ];

    const isPublic =
      publicRoutes.includes(
        pathname
      );

    if (
      !token &&
      !isPublic
    ) {
      router.push("/login");
    }

    if (
      token &&
      pathname === "/login"
    ) {
      router.push("/");
    }
  }, [pathname, router]);

  const isLoginPage =
    pathname === "/login";

  return (
    <html lang="en">
      <body className="bg-black text-white">
        {isLoginPage ? (
          children
        ) : (
          <div className="flex">
            <Sidebar />

            <main className="flex-1">
              {children}
            </main>
          </div>
        )}
      </body>
    </html>
  );
}