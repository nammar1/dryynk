import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CountdownDisplay } from "@/components/ui/CountdownDisplay"
import { Wine, Grape, Users, MapPin, Lock } from "lucide-react"
import { useState } from "react"
import { ConnectionStatus } from "../components/ui/ConnectionStatus"
import { SignupModal } from "../components/ui/SignupModal"

export default function ComingSoonPage() {
  const [showPassword] = useState(false)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [adminToken, setAdminToken] = useState("")
  const [adminLoginError, setAdminLoginError] = useState("")
  const [, setAdminInfo] = useState<{ name: string; role: string } | null>(null)
  const [showSignupModal, setShowSignupModal] = useState(false)

  // Set target date for countdown (September 15, 2025)
  const targetDate = new Date("2025-09-15T12:00:00")

  // Helper to get backend URL
  const getBackendUrl = (path: string) => {
    const base = import.meta.env.VITE_BACKEND_URL || "" // fallback to relative
    return base + path
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAdminLoginError("")
    try {
      const res = await fetch(getBackendUrl("/api/admin/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: adminToken }),
        credentials: "include"
      })
      if (!res.ok) {
        const data = await res.json()
        setAdminLoginError(data.error || "Login failed")
        return
      }
      const data = await res.json()
      setAdminInfo(data.admin)
      setIsAdminLoggedIn(false)
      window.location.href = "/home"
    } catch (err) {
      setAdminLoginError("Network error")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-amber-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-5"></div>

      {/* Header */}
      <header className="relative z-10 px-4 lg:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Wine className="h-8 w-8 text-amber-300" />
          <span className="text-2xl font-bold text-white">dryynk</span>
        </div>
        
        {/* Admin Login Button */}
        <button
          onClick={() => setIsAdminLoggedIn(!isAdminLoggedIn)}
          className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-white hover:bg-white/20 transition-colors"
        >
          <Lock className="h-4 w-4" />
          <span className="text-sm">Admin</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 text-center">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight flex flex-col items-center">
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-purple-300">
                Where Wine Meets Community
              </span>
            </h1>
            <div className="inline-flex items-center space-x-2 bg-amber-300/20 backdrop-blur-sm rounded-full px-4 py-2 text-amber-200 text-sm font-medium mx-auto">
              <Grape className="h-4 w-4" />
              <span>Coming Soon</span>
            </div>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed"></p>
            <Button
              type="button"
              onClick={() => setShowSignupModal(true)}
              className="mt-2 w-full md:w-auto bg-white/10 border border-white/10 text-white font-bold text-2xl md:text-2xl py-5 px-8 rounded-lg transition-all duration-200 hover:bg-white/30 hover:border-amber-300 hover:text-amber-200 hover:scale-105 backdrop-blur-md shadow-none"
              style={{ boxShadow: 'none' }}
            >
              Be the First To Know When We Launch
            </Button>
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-6 my-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
              <Users className="h-8 w-8 text-amber-300 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Connect & Network</h3>
              <p className="text-sm text-purple-100">Build relationships with fellow wine professionals</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
              <MapPin className="h-8 w-8 text-amber-300 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Discover Locations</h3>
              <p className="text-sm text-purple-100">Find wineries and vendors in your region</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
              <Wine className="h-8 w-8 text-amber-300 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Share Your Craft</h3>
              <p className="text-sm text-purple-100">Showcase your wines and expertise</p>
            </div>
          </div>

          {/* Countdown Display */}
          <div className="my-8">
            <CountdownDisplay targetDate={targetDate} />
          </div>

          {/* Additional Info */}
          <div className="text-purple-200 space-y-2">
            <p className="text-lg font-medium">Launching September 15, 2025</p>
            <p className="text-sm">Built for wineries, wine vendors, and wine industry professionals</p>
          </div>
        </div>
      </main>

      {/* Signup Modal */}
      <SignupModal open={showSignupModal} onClose={() => setShowSignupModal(false)}>
        <h2 className="text-2xl font-bold text-white mb-4">Be the First to Know</h2>
        <p className="text-purple-100 mb-6">Join our exclusive list and get early access when we launch.</p>
        <form className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email address"
            className="bg-white/20 border-white/30 text-white placeholder:text-purple-200 focus:bg-white/30 focus:border-amber-300"
            required
          />
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Notify Me When Ready
          </Button>
        </form>
        <p className="text-xs text-purple-200 mt-4">
          No spam, just updates on our launch and exclusive early access.
        </p>
      </SignupModal>

      {/* Admin Login Modal */}
      {isAdminLoggedIn && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full border border-white/20">
            <div className="flex flex-col space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Admin Login</h2>
                <button
                  onClick={() => setIsAdminLoggedIn(false)}
                  className="text-white/70 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              <ConnectionStatus />
            </div>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Admin Token</label>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={adminToken}
                  onChange={e => setAdminToken(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-purple-200 focus:bg-white/30 focus:border-amber-300 pr-10"
                  placeholder="Enter admin token"
                  required
                />
              </div>
              {adminLoginError && <p className="text-red-400 text-sm">{adminLoginError}</p>}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
              >
                Login
              </Button>
            </form>
            <p className="text-xs text-purple-200 mt-4 text-center">
              Enter your admin token. Contact the site owner if you need access.
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 px-4">
        <div className="flex items-center justify-center space-x-2 text-purple-300">
          <Wine className="h-5 w-5" />
          <span className="text-sm">© 2025 dryynk. Crafted with passion for the wine community.</span>
        </div>
      </footer>
    </div>
  )
}
