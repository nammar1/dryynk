import { Wine } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-amber-900">
      {/* Header */}
      <header className="relative z-10 px-4 lg:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Wine className="h-8 w-8 text-amber-300" />
          <span className="text-2xl font-bold text-white">dryynk</span>
        </div>
        
        {/* Navigation Link for testing */}
        <a
          href="/"
          className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-white hover:bg-white/20 transition-colors text-sm"
        >
          Back to Coming Soon
        </a>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Welcome to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-purple-300">
              dryynk
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
            The wine community platform is under development. Check back soon!
          </p>
        </div>
      </main>

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
