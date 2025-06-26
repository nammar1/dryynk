"use client"

import { useCountdown } from "@/hooks/useCountdown"

interface CountdownDisplayProps {
  targetDate: Date
}

export function CountdownDisplay({ targetDate }: CountdownDisplayProps) {
  const timeLeft = useCountdown(targetDate)

  const timeUnits = [
    { label: "Months", value: timeLeft.months, color: "from-amber-300 to-amber-400" },
    { label: "Weeks", value: timeLeft.weeks, color: "from-amber-400 to-amber-500" },
    { label: "Days", value: timeLeft.days, color: "from-amber-500 to-purple-400" },
    { label: "Hours", value: timeLeft.hours, color: "from-purple-400 to-purple-500" },
    { label: "Minutes", value: timeLeft.minutes, color: "from-purple-500 to-amber-300" },
    { label: "Seconds", value: timeLeft.seconds, color: "from-amber-300 to-amber-400" },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">Launch Countdown</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-amber-300 to-purple-400 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {timeUnits.map((unit, index) => (
          <div
            key={unit.label}
            className="relative group"
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {/* Glowing background effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${unit.color} rounded-xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
            ></div>

            {/* Main countdown card */}
            <div className="relative bg-white/10 backdrop-blur-lg border border-amber-300/30 rounded-xl p-4 text-center hover:scale-105 transition-transform duration-300">
              {/* Animated number */}
              <div
                className={`text-3xl md:text-4xl font-bold bg-gradient-to-br ${unit.color} bg-clip-text text-transparent mb-2 font-mono tabular-nums`}
              >
                {unit.value.toString().padStart(2, "0")}
              </div>

              {/* Label */}
              <div className="text-amber-100 text-sm font-medium uppercase tracking-wider">{unit.label}</div>

              {/* Animated border */}
              <div
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${unit.color} rounded-b-xl transition-all duration-1000`}
                style={{
                  width:
                    unit.label === "Seconds"
                      ? `${(unit.value / 60) * 100}%`
                      : unit.label === "Minutes"
                        ? `${(unit.value / 60) * 100}%`
                        : unit.label === "Hours"
                          ? `${(unit.value / 24) * 100}%`
                          : unit.label === "Days"
                            ? `${(unit.value / 7) * 100}%`
                            : unit.label === "Weeks"
                              ? `${(unit.value / 4) * 100}%`
                              : `${(unit.value / 12) * 100}%`,
                }}
              ></div>
            </div>

            {/* Floating particles effect */}
            <div className="absolute -top-2 -right-2 w-2 h-2 bg-amber-300 rounded-full animate-ping opacity-75"></div>
            <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-8 space-y-2">
        <div className="flex justify-between text-amber-200 text-sm">
          <span>Launch Progress</span>
          <span>Almost there...</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-300 via-purple-400 to-amber-400 rounded-full animate-pulse"
            style={{ width: "75%" }}
          ></div>
        </div>
      </div>
    </div>
  )
} 