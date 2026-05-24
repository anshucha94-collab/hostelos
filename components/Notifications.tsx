"use client";

import {
  useEffect,
  useState,
} from "react";

export default function Notifications() {
  const [notifications, setNotifications] =
    useState<any[]>([]);

  const fetchNotifications =
    async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/notifications"
        );

        const data =
          await res.json();

        setNotifications(data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchNotifications();

    const interval =
      setInterval(() => {
        fetchNotifications();
      }, 1500);

    return () =>
      clearInterval(interval);
  }, []);

  return (
    <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Live Security Feed
        </h2>

        <div className="flex items-center gap-2 text-green-400 text-sm">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>

          LIVE
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {notifications.map(
          (notification, index) => (
            <div
              key={notification.id}
              className={`bg-zinc-800 rounded-xl p-4 border border-zinc-700 transition-all duration-500 ${
                index === 0
                  ? "animate-pulse border-green-500"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold text-lg">
                  {notification.student}
                </p>

                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    notification.action ===
                    "ENTRY"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {notification.action}
                </span>
              </div>

              <p className="text-zinc-500 text-sm mt-3">
                {new Date(
                  notification.createdAt
                ).toLocaleString()}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}