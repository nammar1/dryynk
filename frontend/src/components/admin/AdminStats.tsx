import { useEffect, useState } from "react";
import { ShieldCheck, Trash2, PlusCircle, Copy } from "lucide-react";

// Interfaces
interface Admin {
  _id: string;
  name: string;
  role: string;
  status: "active" | "revoked";
  createdAt: string;
  lastLoginAt?: string;
  expiresAt?: string;
  createdBy?: string;
}
interface AdminStatsData {
  totalAdmins: number;
  failedLogins: number;
}

// Main Component
export default function AdminStats() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [stats, setStats] = useState<AdminStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [adminsRes, statsRes] = await Promise.all([
        fetch("/api/admin/all", { credentials: "include" }),
        fetch("/api/admin/stats", { credentials: "include" }),
      ]);
      if (!adminsRes.ok || !statsRes.ok) throw new Error("Failed to fetch admin data");
      const adminsData = await adminsRes.json();
      const statsData = await statsRes.json();
      setAdmins(adminsData);
      setStats(statsData);
    } catch (err) {
      setError("Failed to load admin statistics");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (adminId: string, adminName: string) => {
    if (window.confirm(`Are you sure you want to delete admin '${adminName}'? This action cannot be undone.`)) {
      try {
        const res = await fetch(`/api/admin/${adminId}`, { method: 'DELETE', credentials: 'include' });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to delete admin');
        }
        await fetchData(); // Refresh data
      } catch (err: any) {
        alert(`Error: ${err.message}`);
      }
    }
  };

  return (
    <div className="bg-white/10 rounded-lg p-6 text-white shadow-lg w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="h-8 w-8 text-amber-300" />
          <h2 className="text-2xl font-bold">Admin Management</h2>
        </div>
        <button
            onClick={() => setIsModalOpen(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors"
        >
            <PlusCircle className="h-5 w-5" />
            <span>Generate Token</span>
        </button>
      </div>

      {loading ? <div className="text-purple-200">Loading...</div> : 
       error ? <div className="text-red-400">{error}</div> :
      (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard label="Total Admins" value={stats?.totalAdmins} />
            <StatCard label="Failed Login Attempts" value={stats?.failedLogins} />
            <StatCard label="Active Admins" value={admins.filter(a => a.status === 'active').length} />
          </div>

          <AdminTable admins={admins} onDelete={handleDelete} />
        </>
      )}
      
      {isModalOpen && <GenerateTokenModal onClose={() => setIsModalOpen(false)} onTokenGenerated={fetchData}/>}

    </div>
  );
}

// Sub-components
const StatCard = ({ label, value }: { label: string, value: number | undefined}) => (
    <div className="bg-purple-900/50 p-4 rounded-md">
        <div className="text-3xl font-bold">{value ?? "-"}</div>
        <div className="text-sm text-purple-200">{label}</div>
    </div>
)

const AdminTable = ({ admins, onDelete }: { admins: Admin[], onDelete: (id: string, name: string) => void }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full bg-purple-950/60 rounded-lg">
            <thead>
                <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-purple-200 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-purple-200 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-purple-200 uppercase tracking-wider">Last Login</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-purple-200 uppercase tracking-wider">Created At</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-purple-200 uppercase tracking-wider">Created By</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-purple-200 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-purple-800/50">
                {admins.map((admin) => (
                    <tr key={admin._id} className="hover:bg-purple-900/40">
                        <td className="px-4 py-3 whitespace-nowrap text-amber-100 font-medium">{admin.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                           <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                               admin.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                           }`}>
                               {admin.status}
                           </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-purple-100">{admin.lastLoginAt ? new Date(admin.lastLoginAt).toLocaleString() : "Never"}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-purple-100">{new Date(admin.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-purple-100">{admin.createdBy || "-"}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                            <button onClick={() => onDelete(admin._id, admin.name)} className="text-red-400 hover:text-red-300">
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
         {admins.length === 0 && <div className="text-center py-4 text-purple-200">No admins found.</div>}
    </div>
)

// Modal Component
const GenerateTokenModal = ({ onClose, onTokenGenerated }: { onClose: () => void, onTokenGenerated: () => void }) => {
    const [name, setName] = useState('');
    const [expiresAt, setExpiresAt] = useState<string>('');
    const [generatedToken, setGeneratedToken] = useState<string | null>(null);
    const [error, setError] = useState<string|null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        setIsGenerating(true);
        setError(null);
        try {
            const res = await fetch('/api/admin/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ name, expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to generate token');
            setGeneratedToken(data.token);
            onTokenGenerated(); // Refresh the list in the background
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsGenerating(false);
        }
    };
    
    const copyToClipboard = () => {
        if(generatedToken) {
            navigator.clipboard.writeText(generatedToken);
            alert("Token copied to clipboard!");
        }
    }

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-purple-900/80 border border-purple-700 rounded-lg p-8 text-white shadow-2xl max-w-md w-full m-4">
                <h3 className="text-2xl font-bold mb-4 text-amber-300">Generate New Admin Token</h3>
                {generatedToken ? (
                    <div>
                        <p className="text-purple-200 mb-2">New token generated for <span className="font-bold">{name}</span>.</p>
                        <p className="text-red-400 text-sm mb-4">This is the only time this token will be displayed. Please copy and store it securely.</p>
                        <div className="bg-purple-950/70 p-3 rounded-lg flex items-center justify-between">
                            <pre className="text-amber-100 font-mono overflow-x-auto">{generatedToken}</pre>
                            <button onClick={copyToClipboard} className="ml-4 text-purple-200 hover:text-white">
                                <Copy className="h-5 w-5"/>
                            </button>
                        </div>
                        <button onClick={onClose} className="mt-6 w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg">
                            Close
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <p className="text-purple-200 mb-4">Enter a name for the new admin. A unique, secure token will be generated for them.</p>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Admin Name (e.g., 'Marketing Laptop')"
                            className="w-full bg-purple-950/70 border border-purple-700 rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:outline-none mb-3"
                            required
                        />
                        <label className="block text-purple-200 mb-1">Expiration Date (optional)</label>
                        <input
                            type="date"
                            value={expiresAt}
                            onChange={e => setExpiresAt(e.target.value)}
                            className="w-full bg-purple-950/70 border border-purple-700 rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:outline-none mb-2"
                        />
                         {error && <p className="text-red-400 mt-2">{error}</p>}
                        <div className="flex justify-end items-center mt-6 space-x-4">
                            <button type="button" onClick={onClose} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg">Cancel</button>
                            <button type="submit" disabled={isGenerating} className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg disabled:bg-amber-800 disabled:cursor-not-allowed">
                                {isGenerating ? 'Generating...' : 'Generate'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}; 