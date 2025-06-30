import { type ReactNode, useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { trackEvent } from "../../lib/analytics"

interface SignupModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export function SignupModal({ open, onClose,  }: SignupModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  // Close on ESC
  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, onClose])

  // Click outside to close
  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    // Track signup button click
    trackEvent({
      category: "Newsletter",
      action: "signup_click",
      label: "User clicked email signup"
    });
    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
        // Track successful signup completion
        trackEvent({
          category: "Newsletter",
          action: "signup_complete",
          label: "User completed email signup"
        });
      } else {
        setError(data.error || "Something went wrong.")
      }
    } catch (err) {
      setError("Network error")
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        ref={modalRef}
        className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full border border-white/20 shadow-xl"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Be the First to Know when we launch</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl focus:outline-none"
          aria-label="Close"
        >
          ×
        </button>
        {success ? (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-white mb-4">Thank you for subscribing!</h2>
            <p className="text-purple-100 mb-6">You'll be the first to know when we launch.</p>
            <button
              onClick={onClose}
              className="w-full mt-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Close
            </button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Enter your email address"
              className="bg-white/20 border-white/30 text-white placeholder:text-purple-200 focus:bg-white/30 focus:border-amber-300 focus-visible:ring-2 focus-visible:ring-amber-400/80 focus-visible:border-amber-400/80 transition-all duration-200"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Notify Me When Ready"}
            </button>
          </form>
        )}
        <p className="text-xs text-purple-200 mt-4">
          No spam, just updates on our launch and exclusive early access.
        </p>
      </div>
    </div>
  )
} 