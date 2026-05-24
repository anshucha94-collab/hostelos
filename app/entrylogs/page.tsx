"use client";

import {
  useEffect,
  useState,
} from "react";

export default function EntryLogsPage() {
  const [logs, setLogs] =
    useState<any[]>([]);

  const [student, setStudent] =
    useState("");

  const fetchLogs = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/logs"
      );

      const data =
        await res.json();

      setLogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLogs();

    const interval =
      setInterval(() => {
        fetchLogs();
      }, 2000);

    return () =>
      clearInterval(interval);
  }, []);

  const addLog = async (
    action: string
  ) => {
    if (!student) return;

    try {
      await fetch(
        "http://localhost:5000/logs",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            student,
            action,
          }),
        }
      );

      setStudent("");

      fetchLogs();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">
        Entry Logs
      </h1>

      <p className="text-zinc-400 mt-2">
        Hostel movement monitoring
      </p>

      {/* Form */}
      <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <input
          type="text"
          placeholder="Student Name"
          value={student}
          onChange={(e) =>
            setStudent(
              e.target.value
            )
          }
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 outline-none"
        />

        <div className="flex gap-4 mt-6">
          <button
            onClick={() =>
              addLog("ENTRY")
            }
            className="bg-green-500 text-white px-6 py-3 rounded-xl"
          >
            Mark Entry
          </button>

          <button
            onClick={() =>
              addLog("EXIT")
            }
            className="bg-red-500 text-white px-6 py-3 rounded-xl"
          >
            Mark Exit
          </button>
        </div>
      </div>

      {/* Logs */}
      <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-zinc-800">
            <tr>
              <th className="text-left p-5">
                Student
              </th>

              <th className="text-left p-5">
                Action
              </th>

              <th className="text-left p-5">
                Time
              </th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr
                key={log.id}
                className="border-t border-zinc-800"
              >
                <td className="p-5">
                  {log.student}
                </td>

                <td className="p-5">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      log.action ===
                      "ENTRY"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {log.action}
                  </span>
                </td>

                <td className="p-5">
                  {new Date(
                    log.createdAt
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}