"use client";

import {
  Html5QrcodeScanner,
} from "html5-qrcode";

import {
  useEffect,
  useState,
} from "react";

export default function ScannerPage() {
  const [result, setResult] =
    useState<any>(null);

  useEffect(() => {
    let scanner: any;

    const startScanner = async () => {
      const reader =
        document.getElementById(
          "reader"
        );

      if (!reader) return;

      if (reader.innerHTML !== "") {
        return;
      }

      scanner =
        new Html5QrcodeScanner(
          "reader",
          {
            fps: 10,
            qrbox: {
              width: 250,
              height: 250,
            },
            rememberLastUsedCamera: true,
          },
          false
        );

      let scanning = false;

      scanner.render(
        async (
          decodedText: string
        ) => {
          if (scanning) return;

          scanning = true;

          try {
            const student =
              JSON.parse(
                decodedText
              );

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
                      student.studentId,
                  }),
                }
              );

            const scanResult =
              await response.json();

            setResult({
              ...student,
              action:
                scanResult.action,
              status:
                scanResult.status,
              lateNight:
                scanResult.lateNight,
            });

            setTimeout(() => {
              scanning = false;
            }, 3000);
          } catch (error) {
            console.log(error);

            scanning = false;
          }
        },
        () => {}
      );
    };

    startScanner();

    return () => {
      if (scanner) {
        scanner
          .clear()
          .catch(() => {});
      }
    };
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">
        QR Scanner
      </h1>

      <p className="text-zinc-400 mt-2">
        Smart hostel entry scanner
      </p>

      <div className="mt-10 max-w-xl bg-white p-4 rounded-2xl">
        <div id="reader"></div>
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

          <p className="mt-2">
            Status:
            {result.status}
          </p>

          <p className="mt-4 text-green-400">
            {result.action} Logged
            Successfully
          </p>

          {result.lateNight && (
            <p className="mt-4 text-red-400 font-bold">
              Late Night Movement
              Alert
            </p>
          )}
        </div>
      )}
    </div>
  );
}