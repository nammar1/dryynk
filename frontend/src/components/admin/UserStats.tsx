import { Users } from "lucide-react";
import { useEffect, useState } from "react";

interface Stats {
  uniqueVisitors: number;
  returningVisitors: number;
  signupClicks: number;
  signupCompletes: number;
}

export default function UserStats() {
  const [stats, setStats] = useState<Stats>({
    uniqueVisitors: 0,
    returningVisitors: 0,
    signupClicks: 0,
    signupCompletes: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/analytics/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats({
          uniqueVisitors: data.uniqueVisitors || 0,
          returningVisitors: data.returningVisitors || 0,
          signupClicks: data.signupClicks || 0,
          signupCompletes: data.signupCompletes || 0,
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load analytics data");
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white/10 rounded-lg p-6 text-white shadow-lg w-full">
      <div className="flex items-center space-x-3 mb-4">
        <Users className="h-8 w-8 text-amber-300" />
        <h2 className="text-2xl font-bold">User Statistics</h2>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-400">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-purple-900/50 p-4 rounded-md">
            <div className="text-3xl font-bold">{stats.uniqueVisitors}</div>
            <div className="text-sm text-purple-200">Unique Visitors</div>
          </div>
          <div className="bg-purple-900/50 p-4 rounded-md">
            <div className="text-3xl font-bold">{stats.returningVisitors}</div>
            <div className="text-sm text-purple-200">Returning Visitors</div>
          </div>
          <div className="bg-purple-900/50 p-4 rounded-md">
            <div className="text-3xl font-bold">{stats.signupClicks}</div>
            <div className="text-sm text-purple-200">Email Signup Clicks</div>
          </div>
          <div className="bg-purple-900/50 p-4 rounded-md">
            <div className="text-3xl font-bold">{stats.signupCompletes}</div>
            <div className="text-sm text-purple-200">Completed Email Signups</div>
          </div>
        </div>
      )}

    </div>
  );
} 