"use client";

import "./globals.css";

import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <div className="flex">
          <div className="w-64 min-h-screen bg-zinc-950 border-r border-zinc-800 p-6">
            <h1 className="text-4xl font-bold mb-10">
              HostelOS
            </h1>

            <nav className="space-y-4">
              <Link href="/" className="block">
                Dashboard
              </Link>

              <Link
                href="/students"
                className="block"
              >
                Students
              </Link>

              <Link
                href="/scanner"
                className="block text-green-400"
              >
                Security Hub
              </Link>

              <Link
                href="/entrylogs"
                className="block"
              >
                Entry Logs
              </Link>
            </nav>
          </div>

          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}