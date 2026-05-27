"use client";

import { useEffect, useState } from "react";

import QRCode from "react-qr-code";

export default function QRCodesPage() {
  const [students, setStudents] =
    useState([]);

  useEffect(() => {
    fetch(
      "https://hostelos-ld1n.onrender.com/students"
    )
      .then((res) => res.json())
      .then((data) =>
        setStudents(data)
      );
  }, []);

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-8">
        Student QR Codes
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {students.map((student: any) => (
          <div
            key={student.id}
            className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800"
          >
            <div className="bg-white p-4 rounded-xl">
              <QRCode
                value={String(student.id)}
                size={200}
              />
            </div>

            <h2 className="text-2xl font-bold mt-4">
              {student.name}
            </h2>

            <p className="text-zinc-400">
              Room: {student.room}
            </p>

            <p className="text-zinc-400">
              Branch: {student.branch}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}