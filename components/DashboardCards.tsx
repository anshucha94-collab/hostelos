"use client";

import { useEffect, useState } from "react";

export default function DashboardCards() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:5000/dashboard")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  if (!stats) {
    return (
      <div className="mt-10">
        Loading dashboard...
      </div>
    );
  }

  const cards = [
    {
      title: "Total Students",
      value: stats.totalStudents,
    },
    {
      title: "Inside Hostel",
      value: stats.insideStudents,
    },
    {
      title: "Outside Hostel",
      value: stats.outsideStudents,
    },
    {
      title: "Total Logs",
      value: stats.totalLogs,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
        >
          <p className="text-zinc-400">
            {card.title}
          </p>

          <h2 className="text-4xl font-bold mt-4">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}