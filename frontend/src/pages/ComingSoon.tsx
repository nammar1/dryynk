import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CountdownDisplay } from "@/components/ui/CountdownDisplay"
import { Wine, Grape, Users, MapPin, Lock, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export default function ComingSoonPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [adminCredentials, setAdminCredentials] = useState({
    username: "",
    password: ""
  })

  // Set target date for countdown (September 15, 2025)
  const targetDate = new Date("2025-09-15T12:00:00")

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // For now, just a simple check - in production this would be proper authentication
    if (adminCredentials.username === "admin" && adminCredentials.password === "admin123") {
      setIsAdminLoggedIn(true)
      // Redirect to home page after successful login
      window.location.href = "/home"
    } else {
      alert("Invalid credentials. Try admin/admin123")
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
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-amber-300/20 backdrop-blur-sm rounded-full px-4 py-2 text-amber-200 text-sm font-medium">
              <Grape className="h-4 w-4" />
              <span>Coming Soon</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Where Wine
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-purple-300">
                Meets Community
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              The first social platform designed exclusively for wineries and wine vendors to connect, collaborate, and
              grow their business together.
            </p>
          </div>

          {/* Countdown Display */}
          <div className="my-12">
            <CountdownDisplay targetDate={targetDate} />
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

          {/* Email Signup */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md mx-auto">
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
          </div>

          {/* Additional Info */}
          <div className="text-purple-200 space-y-2">
            <p className="text-lg font-medium">Launching September 15, 2025</p>
            <p className="text-sm">Built for wineries, wine vendors, and wine industry professionals</p>
          </div>
        </div>
      </main>

      {/* Admin Login Modal */}
      {isAdminLoggedIn && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Admin Login</h2>
              <button
                onClick={() => setIsAdminLoggedIn(false)}
                className="text-white/70 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Username</label>
                <Input
                  type="text"
                  value={adminCredentials.username}
                  onChange={(e) => setAdminCredentials({...adminCredentials, username: e.target.value})}
                  className="bg-white/20 border-white/30 text-white placeholder:text-purple-200 focus:bg-white/30 focus:border-amber-300"
                  placeholder="Enter username"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={adminCredentials.password}
                    onChange={(e) => setAdminCredentials({...adminCredentials, password: e.target.value})}
                    className="bg-white/20 border-white/30 text-white placeholder:text-purple-200 focus:bg-white/30 focus:border-amber-300 pr-10"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
              >
                Login
              </Button>
            </form>
            
            <p className="text-xs text-purple-200 mt-4 text-center">
              Demo credentials: admin / admin123
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
