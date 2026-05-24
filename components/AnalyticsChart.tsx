"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AnalyticsChart() {
  const [stats, setStats] =
    useState<any>(null);

  const fetchStats = async () => {
    try {
      const res = await fetch(
        "https://hostelos-ld1n.onrender.com/dashboard"
      );

      const data =
        await res.json();

      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();

    const interval =
      setInterval(() => {
        fetchStats();
      }, 2000);

    return () =>
      clearInterval(interval);
  }, []);

  if (!stats) {
    return (
      <div className="mt-10">
        Loading analytics...
      </div>
    );
  }

  const barData = [
    {
      name: "Inside",
      value:
        stats.insideStudents,
    },
    {
      name: "Outside",
      value:
        stats.outsideStudents,
    },
  ];

  const pieData = [
    {
      name: "Inside",
      value:
        stats.insideStudents,
    },
    {
      name: "Outside",
      value:
        stats.outsideStudents,
    },
  ];

  return (
    <div className="mt-10 grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6">
          Hostel Occupancy
        </h2>

        <div className="h-80">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart data={barData}>
              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6">
          Student Distribution
        </h2>

        <div className="h-80">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={120}
                label
              >
                <Cell fill="#22c55e" />

                <Cell fill="#ef4444" />
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}