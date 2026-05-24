"use client";

import { useEffect, useState } from "react";

import QRCode from "react-qr-code";

export default function QRPage() {
  const [students, setStudents] =
    useState<any[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(
          "https://hostelos-ld1n.onrender.com/students"
        );

        const data = await res.json();

        setStudents(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">
        Student QR Codes
      </h1>

      <p className="text-zinc-400 mt-2">
        Smart identity system
      </p>

      {students.length === 0 ? (
        <div className="mt-10 text-zinc-400">
          No students found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-10">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6">
                {student.name}
              </h2>

              <div className="bg-white p-4 rounded-2xl inline-block">
                <QRCode
                  value={JSON.stringify({
                    studentId:
                      student.id,
                    studentName:
                      student.name,
                    room:
                      student.room,
                    branch:
                      student.branch,
                  })}
                  size={200}
                />
              </div>

              <div className="mt-6 space-y-2 text-zinc-400">
                <p>
                  ID:
                  {student.id}
                </p>

                <p>
                  Branch:
                  {student.branch}
                </p>

                <p>
                  Room:
                  {student.room}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}