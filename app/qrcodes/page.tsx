"use client";

import QRCode from "react-qr-code";

const students = [
  {
    id: 1,
    name: "Rahul Sharma",
  },
  {
    id: 2,
    name: "Ankit Verma",
  },
  {
    id: 3,
    name: "Aman Joshi",
  },
];

export default function QRPage() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">
        Student QR Codes
      </h1>

      <p className="text-zinc-400 mt-2">
        Smart hostel identity system
      </p>

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
                  studentId: student.id,
                  studentName:
                    student.name,
                })}
                size={200}
              />
            </div>

            <p className="mt-6 text-zinc-400">
              Student ID:
              {student.id}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}