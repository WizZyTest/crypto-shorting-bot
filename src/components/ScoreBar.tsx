"use client";

interface ScoreBarProps {
  score: number;
  maxScore?: number;
}

export default function ScoreBar({ score, maxScore = 15 }: ScoreBarProps) {
  const pct = Math.min(100, (score / maxScore) * 100);
  const color =
    score >= 7
      ? "from-red-500 to-red-400"
      : score >= 4
        ? "from-amber-500 to-amber-400"
        : "from-slate-500 to-slate-400";

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-slate-400">Score</span>
        <span
          className={`text-sm font-bold ${score >= 7 ? "text-red-400" : score >= 4 ? "text-amber-400" : "text-slate-400"}`}
        >
          {score.toFixed(1)}
        </span>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
