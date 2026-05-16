import DashboardCards from "@/components/DashboardCards";
import RecentActivity from "@/components/RecentActivity";
import RoomStatus from "@/components/RoomStatus";

export default function Home() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      <p className="text-zinc-400 mt-2">
        Smart Hostel Monitoring System
      </p>

      <DashboardCards />

      <RecentActivity />

      <RoomStatus />
    </div>
  );
}