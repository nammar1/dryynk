import { useEffect, useState } from "react";
import { Newspaper } from "lucide-react";

interface Subscriber {
  email: string;
  createdAt: string;
}

export default function NewsletterStats() {
  const [stats, setStats] = useState<{ total: number; recent: number; openRate: number | null } | null>(null);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const statsRes = await fetch("/api/newsletter/stats", { credentials: "include" });
        const subsRes = await fetch("/api/newsletter/subscribers", { credentials: "include" });
        if (!statsRes.ok || !subsRes.ok) throw new Error("Failed to fetch data");
        const statsData = await statsRes.json();
        const subsData = await subsRes.json();
        setStats(statsData);
        setSubscribers(subsData.subscribers);
      } catch (err) {
        setError("Failed to load newsletter stats");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-white/10 rounded-lg p-6 text-white shadow-lg w-full">
      <div className="flex items-center space-x-3 mb-4">
        <Newspaper className="h-8 w-8 text-amber-300" />
        <h2 className="text-2xl font-bold">Newsletter Statistics</h2>
      </div>
      {loading ? (
        <div className="text-purple-200">Loading...</div>
      ) : error ? (
        <div className="text-red-400">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-purple-900/50 p-4 rounded-md">
              <div className="text-3xl font-bold">{stats?.total ?? "-"}</div>
              <div className="text-sm text-purple-200">Total Subscribers</div>
            </div>
            <div className="bg-purple-900/50 p-4 rounded-md">
              <div className="text-3xl font-bold">{stats?.recent ?? "-"}</div>
              <div className="text-sm text-purple-200">New Subscribers (Last 30 Days)</div>
            </div>
            <div className="bg-purple-900/50 p-4 rounded-md">
              <div className="text-3xl font-bold">{stats && stats.openRate !== null ? `${stats.openRate}%` : "-"}</div>
              <div className="text-sm text-purple-200">Open Rate</div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-purple-950/60 rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-purple-200">Email</th>
                  <th className="px-4 py-2 text-left text-purple-200">Subscribed At</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((s, i) => (
                  <tr key={s.email + s.createdAt} className={i % 2 === 0 ? "bg-purple-900/30" : ""}>
                    <td className="px-4 py-2 font-mono text-amber-100">{s.email}</td>
                    <td className="px-4 py-2 text-purple-100">{new Date(s.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {subscribers.length === 0 && (
              <div className="text-purple-200 mt-4">No subscribers found.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
} 