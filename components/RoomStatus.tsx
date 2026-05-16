const rooms = [
  {
    room: "Block A",
    occupied: 85,
  },
  {
    room: "Block B",
    occupied: 65,
  },
  {
    room: "Block C",
    occupied: 95,
  },
];

export default function RoomStatus() {
  return (
    <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        Hostel Occupancy
      </h2>

      <div className="space-y-6">
        {rooms.map((room, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2">
              <span>{room.room}</span>
              <span>{room.occupied}%</span>
            </div>

            <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full"
                style={{
                  width: `${room.occupied}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}