"use client";

import { useState } from "react";

interface ScanStats {
  scanned: number;
  highConviction: number;
  mediumConviction: number;
  lastScanTime: string | null;
}

interface ScannerControlsProps {
  onScanComplete: () => void;
  stats: ScanStats;
}

export default function ScannerControls({ onScanComplete, stats }: ScannerControlsProps) {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleScan = async () => {
    setScanning(true);
    setError(null);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return p + Math.random() * 15;
      });
    }, 800);

    try {
      const res = await fetch("/api/scan", { method: "POST" });
      clearInterval(progressInterval);
      setProgress(100);

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Scan failed");
      } else {
        setTimeout(() => {
          setProgress(0);
          onScanComplete();
        }, 500);
      }
    } catch (e) {
      clearInterval(progressInterval);
      setError("Неуспешна връзка с API");
      console.error(e);
    } finally {
      setTimeout(() => {
        setScanning(false);
      }, 600);
    }
  };

  return (
    <div className="bg-[#131929] border border-[#1e2d47] rounded-xl p-5">
      {/* Scanner header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div
            className={`absolute inset-0 rounded-full ${scanning ? "border-2 border-red-500/30 animate-spin-slow" : "border border-slate-700"}`}
          />
          <span className="text-xl">🎯</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-white leading-tight">Short Scanner</h1>
          <p className="text-xs text-slate-500">Binance USDT-M Futures · Top 100 монети</p>
        </div>
        <div className="ml-auto">
          {scanning && (
            <div className="flex items-center gap-2 text-red-400 text-sm animate-pulse">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              Сканиране...
            </div>
          )}
        </div>
      </div>

      {/* Progress bar */}
      {scanning && (
        <div className="mb-4">
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Анализиране на OI, Funding Rate, RSI, структура... ({Math.round(progress)}%)
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div className="bg-slate-900/60 rounded-lg p-3 text-center">
          <div className="text-xs text-slate-500 mb-1">Сканирани</div>
          <div className="text-xl font-bold text-slate-200">{stats.scanned}</div>
        </div>
        <div className="bg-red-500/8 border border-red-500/20 rounded-lg p-3 text-center">
          <div className="text-xs text-red-400 mb-1">🔴 HIGH</div>
          <div className="text-xl font-bold text-red-400">{stats.highConviction}</div>
        </div>
        <div className="bg-amber-500/8 border border-amber-500/20 rounded-lg p-3 text-center">
          <div className="text-xs text-amber-400 mb-1">🟡 MEDIUM</div>
          <div className="text-xl font-bold text-amber-400">{stats.mediumConviction}</div>
        </div>
        <div className="bg-slate-900/60 rounded-lg p-3 text-center">
          <div className="text-xs text-slate-500 mb-1">Последен</div>
          <div className="text-xs font-semibold text-slate-300 mt-1">
            {stats.lastScanTime
              ? new Date(stats.lastScanTime).toLocaleTimeString("bg-BG", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "—"}
          </div>
        </div>
      </div>

      {/* Criteria legend */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4 text-xs">
        {[
          { icon: "⚡", label: "Liquidity Sweep", pts: "+3т.", color: "text-red-400" },
          { icon: "📉", label: "RSI Bearish Div.", pts: "+2т.", color: "text-amber-400" },
          { icon: "🔻", label: "Market Structure Break", pts: "+2т.", color: "text-purple-400" },
          { icon: "⚠️", label: "OI Spike", pts: "+2т.", color: "text-amber-400" },
          { icon: "📊", label: "CVD Дивергенция", pts: "+2т.", color: "text-blue-400" },
          { icon: "🔥", label: "Funding >0.05%", pts: "+2т.", color: "text-red-400" },
        ].map((c) => (
          <div
            key={c.label}
            className="flex items-center gap-1.5 bg-slate-900/40 rounded px-2 py-1.5"
          >
            <span>{c.icon}</span>
            <span className="text-slate-400 truncate">{c.label}</span>
            <span className={`ml-auto font-bold ${c.color} shrink-0`}>{c.pts}</span>
          </div>
        ))}
      </div>

      {/* Scan button */}
      <button
        onClick={handleScan}
        disabled={scanning}
        className={`w-full py-3 px-6 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 ${
          scanning
            ? "bg-slate-700 text-slate-500 cursor-not-allowed"
            : "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-lg hover:shadow-red-500/25 active:scale-[0.98]"
        }`}
      >
        {scanning ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-slate-500 border-t-slate-300 rounded-full animate-spin" />
            Сканиране...
          </span>
        ) : (
          "🚀 Стартирай Скан"
        )}
      </button>

      <p className="text-center text-xs text-slate-600 mt-2">
        ~30-60 секунди · Binance Futures API · Без API ключ
      </p>
    </div>
  );
}
