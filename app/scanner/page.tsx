"use client";

import dynamic from "next/dynamic";

import { useState } from "react";

const QrScanner = dynamic(
  () => import("react-qr-scanner"),
  {
    ssr: false,
  }
);

export default function ScannerPage() {
  const [result, setResult] =
    useState<any>(null);

  const handleScan = async (
    data: any
  ) => {
    if (data?.text) {
      try {
        const student = JSON.parse(
          data.text
        );

        setResult(student);

        await fetch(
          "http://localhost:5000/logs",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              student:
                student.studentName,
              action: "ENTRY",
            }),
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleError = (err: any) => {
    console.log(err);
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">
        QR Scanner
      </h1>

      <p className="text-zinc-400 mt-2">
        Smart hostel entry scanner
      </p>

      <div className="mt-10 max-w-xl">
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{
            width: "100%",
          }}
        />
      </div>

      {result && (
        <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold">
            Student Detected
          </h2>

          <p className="mt-4">
            Name:
            {result.studentName}
          </p>

          <p className="mt-2">
            ID:
            {result.studentId}
          </p>

          <p className="mt-4 text-green-400">
            Entry Logged Successfully
          </p>
        </div>
      )}
    </div>
  );
}