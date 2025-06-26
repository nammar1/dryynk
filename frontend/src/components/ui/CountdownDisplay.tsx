"use client"

import { useCountdown } from "@/hooks/useCountdown"

interface CountdownDisplayProps {
  targetDate: Date
}

export function CountdownDisplay({ targetDate }: CountdownDisplayProps) {
  const timeLeft = useCountdown(targetDate)

  const timeUnits = [
    { label: "Months", value: timeLeft.months, color: "from-primary-400 to-primary-500" },
    { label: "Weeks", value: timeLeft.weeks, color: "from-primary-400 to-primary-500" },
    { label: "Days", value: timeLeft.days, color: "from-primary-400 to-primary-500" },
    { label: "Hours", value: timeLeft.hours, color: "from-primary-400 to-primary-500" },
    { label: "Minutes", value: timeLeft.minutes, color: "from-primary-400 to-primary-500" },
    { label: "Seconds", value: timeLeft.seconds, color: "from-primary-400 to-primary-500" },
  ]

  return (
    <div className="w-full max-w-full mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-0 mb-4 drop-shadow-lg">Launch Countdown</h2>
        <div className="w-32 h-1 bg-gradient-to-r from-primary-400 to-primary-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 lg:gap-8">
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
              className={`absolute inset-0 bg-gradient-to-br ${unit.color} rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
            ></div>

            {/* Main countdown card */}
            <div className="relative bg-neutral-900/50 backdrop-blur-lg border border-primary-400/30 rounded-2xl p-4 md:p-6 lg:p-8 text-center hover:scale-105 transition-transform duration-300 min-h-[120px] md:min-h-[140px] lg:min-h-[160px] flex flex-col justify-center">
              {/* Animated number */}
              <div
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-br ${unit.color} bg-clip-text text-transparent mb-2 md:mb-3 lg:mb-4 font-mono tabular-nums leading-none`}
              >
                {unit.value.toString().padStart(2, "0")}
              </div>

              {/* Label */}
              <div className="text-primary-100 text-xs sm:text-sm md:text-base lg:text-lg font-medium uppercase tracking-wider">{unit.label}</div>

              {/* Animated border */}
              <div
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${unit.color} rounded-b-2xl transition-all duration-1000`}
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
            <div className="absolute -top-2 -right-2 w-2 h-2 md:w-3 md:h-3 bg-primary-400 rounded-full animate-ping opacity-75"></div>
            <div className="absolute -bottom-1 -left-1 w-1 h-1 md:w-2 md:h-2 bg-primary-500 rounded-full animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-8 md:mt-12 space-y-3">
        <div className="flex justify-between text-primary-200 text-sm md:text-base">
          <span>Launch Progress</span>
          <span>Almost there...</span>
        </div>
        <div className="w-full bg-neutral-900/30 rounded-full h-2 md:h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 rounded-full animate-pulse"
            style={{ width: "75%" }}
          ></div>
        </div>
      </div>
    </div>
  )
} 