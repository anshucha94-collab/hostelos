"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";

import QRCode from "react-qr-code";

import { QrReader } from "react-qr-reader";

export default function ScannerPage() {
  const [students, setStudents] =
    useState<any[]>([]);

  const [scanResult, setScanResult] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    fetch(
      "https://hostelos-ld1n.onrender.com/students"
    )
      .then((res) => res.json())
      .then((data) =>
        setStudents(data)
      );
  }, []);

  const handleScan = async (
    data: string
  ) => {
    if (!data || loading) return;

    setLoading(true);

    setScanResult(data);

    try {
      const response = await fetch(
        "https://hostelos-ld1n.onrender.com/scan",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            studentId:
              Number(data),
          }),
        }
      );

      const result =
        await response.json();

      setMessage(
        `${result.student} ${result.action} (${result.status})`
      );

      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-black min-h-screen text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-5xl font-bold">
              Security Hub
            </h1>

            <p className="text-zinc-400 mt-3 text-lg">
              Smart hostel monitoring &
              QR access system
            </p>
          </div>

          <div className="bg-green-500/10 border border-green-500 text-green-400 px-6 py-3 rounded-2xl text-lg font-semibold">
            LIVE SYSTEM
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">
                QR Scanner
              </h2>

              <div className="text-green-400 font-semibold">
                Camera Active
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-zinc-700">
              <QrReader
                constraints={{
                  facingMode:
                    "environment",
                }}
                onResult={(result) => {
                  if (result) {
                    handleScan(
                      result.getText()
                    );
                  }
                }}
              />
            </div>

            <div className="mt-6 bg-zinc-900 rounded-2xl p-5 border border-zinc-800">
              <p className="text-zinc-400 text-lg">
                Scan Result
              </p>

              <p className="text-3xl font-bold text-green-400 mt-2">
                {scanResult ||
                  "Waiting for scan..."}
              </p>

              <p className="text-yellow-400 text-xl mt-4">
                {message}
              </p>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 overflow-y-auto max-h-[900px]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">
                Student QR Cards
              </h2>

              <div className="bg-blue-500/10 border border-blue-500 text-blue-400 px-4 py-2 rounded-xl font-semibold">
                {students.length} Students
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {students.map(
                (student: any) => (
                  <div
                    key={student.id}
                    className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
                  >
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="bg-white p-4 rounded-2xl">
                        <QRCode
                          value={String(
                            student.id
                          )}
                          size={180}
                        />
                      </div>

                      <div className="flex-1 w-full">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-3xl font-bold capitalize">
                            {student.name}
                          </h3>

                          <div
                            className={`px-4 py-2 rounded-xl text-sm font-bold ${
                              student.status ===
                              "Inside"
                                ? "bg-green-500/10 text-green-400 border border-green-500"
                                : "bg-red-500/10 text-red-400 border border-red-500"
                            }`}
                          >
                            {student.status}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-lg">
                          <div className="bg-zinc-950 rounded-2xl p-4 border border-zinc-800">
                            <p className="text-zinc-500">
                              Student ID
                            </p>

                            <p className="font-bold text-xl mt-1">
                              #
                              {
                                student.id
                              }
                            </p>
                          </div>

                          <div className="bg-zinc-950 rounded-2xl p-4 border border-zinc-800">
                            <p className="text-zinc-500">
                              Room
                            </p>

                            <p className="font-bold text-xl mt-1">
                              {
                                student.room
                              }
                            </p>
                          </div>

                          <div className="bg-zinc-950 rounded-2xl p-4 border border-zinc-800 col-span-2">
                            <p className="text-zinc-500">
                              Branch
                            </p>

                            <p className="font-bold text-xl mt-1 capitalize">
                              {
                                student.branch
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}