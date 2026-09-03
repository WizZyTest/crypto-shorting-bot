"use client";

interface ConvictionBadgeProps {
  conviction: string;
  size?: "sm" | "md" | "lg";
}

export default function ConvictionBadge({
  conviction,
  size = "md",
}: ConvictionBadgeProps) {
  const sizeClass =
    size === "sm"
      ? "text-[10px] px-1.5 py-0.5"
      : size === "lg"
        ? "text-sm px-3 py-1"
        : "text-xs px-2 py-0.5";

  if (conviction === "HIGH") {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded font-bold tracking-wide ${sizeClass} bg-red-500/20 text-red-400 border border-red-500/40 glow-red`}
      >
        <span className="animate-pulse-red">🔴</span> HIGH
      </span>
    );
  }
  if (conviction === "MEDIUM") {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded font-bold tracking-wide ${sizeClass} bg-amber-500/20 text-amber-400 border border-amber-500/40`}
      >
        🟡 MEDIUM
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-center gap-1 rounded font-bold tracking-wide ${sizeClass} bg-slate-700/50 text-slate-400 border border-slate-600/40`}
    >
      ⚪ LOW
    </span>
  );
}
