"use client";

import { useEffect, useState } from "react";

import { QrReader } from "react-qr-reader";

export default function ScannerPage() {
  const [result, setResult] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleScan = async (
    data: string | null
  ) => {
    if (data) {
      setResult(data);

      try {
        const response =
          await fetch(
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
          `${result.student} ${result.action}`
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-8">
        QR Scanner
      </h1>

      <div className="bg-zinc-900 p-6 rounded-2xl max-w-xl">
        <QrReader
          constraints={{
            facingMode: "environment",
          }}
          onResult={(result) => {
            if (result) {
              handleScan(
                result.getText()
              );
            }
          }}
        />

        <div className="mt-6">
          <p className="text-xl">
            QR Result:
          </p>

          <p className="text-green-400">
            {result}
          </p>

          <p className="text-yellow-400 mt-4">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}