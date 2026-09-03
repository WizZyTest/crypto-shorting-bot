"use client";

interface SignalBadgeProps {
  label: string;
  active: boolean;
  icon?: string;
  color?: "red" | "amber" | "blue" | "purple" | "green";
}

const colorMap = {
  red: "bg-red-500/20 text-red-400 border-red-500/30",
  amber: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  blue: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  purple: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  green: "bg-green-500/20 text-green-400 border-green-500/30",
};

export default function SignalBadge({
  label,
  active,
  icon = "●",
  color = "red",
}: SignalBadgeProps) {
  if (!active) return null;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-xs font-medium ${colorMap[color]}`}
    >
      <span className="text-[10px]">{icon}</span>
      {label}
    </span>
  );
}
