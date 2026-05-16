const activities = [
  {
    name: "Rahul Sharma",
    room: "A-102",
    status: "Exited",
    time: "6:45 PM",
  },
  {
    name: "Ankit Verma",
    room: "B-201",
    status: "Entered",
    time: "7:10 PM",
  },
  {
    name: "Rohit Kumar",
    room: "C-110",
    status: "Late Entry",
    time: "10:55 PM",
  },
];

export default function RecentActivity() {
  return (
    <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        Recent Activity
      </h2>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-zinc-800 pb-4"
          >
            <div>
              <p className="font-semibold">
                {activity.name}
              </p>

              <p className="text-zinc-400 text-sm">
                Room {activity.room}
              </p>
            </div>

            <div className="text-right">
              <p
                className={`font-semibold ${
                  activity.status === "Late Entry"
                    ? "text-red-400"
                    : "text-green-400"
                }`}
              >
                {activity.status}
              </p>

              <p className="text-zinc-400 text-sm">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}