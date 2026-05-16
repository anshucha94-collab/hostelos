"use client";

import { useEffect, useState } from "react";

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);

  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [room, setRoom] = useState("");
  const [status, setStatus] = useState("Inside");

  const fetchStudents = async () => {
    const res = await fetch(
      "http://localhost:5000/students"
    );

    const data = await res.json();

    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async () => {
    if (!name || !branch || !room) return;

    await fetch(
      "http://localhost:5000/students",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          branch,
          room,
          status,
        }),
      }
    );

    setName("");
    setBranch("");
    setRoom("");
    setStatus("Inside");

    fetchStudents();
  };

  const deleteStudent = async (id: number) => {
    await fetch(
      `http://localhost:5000/students/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchStudents();
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">
        Students
      </h1>

      <p className="text-zinc-400 mt-2">
        PostgreSQL Connected Students
      </p>

      {/* Add Student Form */}
      <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6">
          Add Student
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 outline-none"
          />

          <input
            type="text"
            placeholder="Branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 outline-none"
          />

          <input
            type="text"
            placeholder="Room Number"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 outline-none"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 outline-none"
          >
            <option>Inside</option>
            <option>Outside</option>
            <option>Late</option>
          </select>
        </div>

        <button
          onClick={addStudent}
          className="mt-6 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:opacity-80 transition"
        >
          Add Student
        </button>
      </div>

      {/* Students Table */}
      <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-zinc-800">
            <tr>
              <th className="text-left p-5">ID</th>
              <th className="text-left p-5">Name</th>
              <th className="text-left p-5">Branch</th>
              <th className="text-left p-5">Room</th>
              <th className="text-left p-5">Status</th>
              <th className="text-left p-5">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                className="border-t border-zinc-800"
              >
                <td className="p-5">
                  {student.id}
                </td>

                <td className="p-5">
                  {student.name}
                </td>

                <td className="p-5">
                  {student.branch}
                </td>

                <td className="p-5">
                  {student.room}
                </td>

                <td className="p-5">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      student.status === "Inside"
                        ? "bg-green-500/20 text-green-400"
                        : student.status === "Outside"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>

                <td className="p-5">
                  <button
                    onClick={() =>
                      deleteStudent(student.id)
                    }
                    className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}