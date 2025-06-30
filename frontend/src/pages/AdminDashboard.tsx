import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Wine, Users, ShieldCheck, Newspaper } from "lucide-react";

import UserStats from "../components/admin/UserStats";
import AdminStats from "../components/admin/AdminStats";
import NewsletterStats from "../components/admin/NewsletterStats";

const TABS = {
  USERS: "Users",
  ADMIN: "Admin",
  NEWSLETTER: "Newsletter",
};

export default function AdminDashboard() {
  const [adminName, setAdminName] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(TABS.USERS);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAdmin() {
      try {
        const res = await fetch("/api/admin/me", { credentials: "include" });
        if (!res.ok) throw new Error("Not authenticated");
        const data = await res.json();
        setAdminName(data.admin?.name || "Admin");
      } catch {
        setAdminName(null);
        navigate("/");
      }
    }
    fetchAdmin();
  }, [navigate]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    setAdminName(null);
    navigate("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case TABS.USERS:
        return <UserStats />;
      case TABS.ADMIN:
        return <AdminStats />;
      case TABS.NEWSLETTER:
        return <NewsletterStats />;
      default:
        return <UserStats />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-amber-900 text-white">
      <header className="relative z-10 px-6 h-20 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center space-x-4">
          <Wine className="h-9 w-9 text-amber-300" />
          <div>
            <span className="text-2xl font-bold">dryynk Admin</span>
            {adminName && <p className="text-sm text-purple-200">Welcome, {adminName}</p>}
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 hover:bg-white/20 transition-colors text-sm font-semibold"
        >
          Logout
        </button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 p-6 border-r border-white/10 min-h-[calc(100vh-5rem)]">
          <h2 className="text-lg font-semibold mb-6 text-purple-200">Analytics</h2>
          <nav className="flex flex-col space-y-2">
            {[
              { id: TABS.USERS, label: "Users Stats", Icon: Users },
              { id: TABS.ADMIN, label: "Admin Stats", Icon: ShieldCheck },
              { id: TABS.NEWSLETTER, label: "Newsletter Stats", Icon: Newspaper },
            ].map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors text-left w-full ${
                  activeTab === id
                    ? "bg-amber-600/80 text-white"
                    : "hover:bg-white/10 text-purple-100"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
} 