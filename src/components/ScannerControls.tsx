"use client";

interface ScannerControlsProps {
  onScan: () => void;
  isScanning: boolean;
  totalScanned: number;
  highCount: number;
  mediumCount: number;
  lastScanTime: string | null;
}

export default function ScannerControls({
  onScan,
  isScanning,
  totalScanned,
  highCount,
  mediumCount,
  lastScanTime,
}: ScannerControlsProps) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 font-bold text-xl">
          🎯
        </div>
        <div>
          <h2 className="font-bold text-slate-100 text-base">Short Scanner</h2>
          <p className="text-xs text-slate-400">Binance USDT-M Futures · Top 100</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-center">
        <div>
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Сканирани</div>
          <div className="text-lg font-bold text-slate-200">{totalScanned}</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase font-semibold">High</div>
          <div className="text-lg font-bold text-red-400">{highCount}</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Medium</div>
          <div className="text-lg font-bold text-amber-400">{mediumCount}</div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={onScan}
          disabled={isScanning}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-xl shadow-lg shadow-red-950/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isScanning ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Сканиране...</span>
            </>
          ) : (
            <>
              <span>🚀</span>
              <span>Стартирай Скан</span>
            </>
          )}
        </button>

        <div className="flex justify-between items-center text-[11px] text-slate-500 px-1">
          <span>~30-60 секунди · Binance Futures API</span>
          <span>{lastScanTime ? `Последен: ${lastScanTime}` : "Не е сканирано"}</span>
        </div>
      </div>
    </div>
  );
}
