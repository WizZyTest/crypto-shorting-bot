"use client";

import ConvictionBadge from "./ConvictionBadge";

interface ScanResult {
  id: number;
  symbol: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  fundingRate: number;
  openInterestChange: number;
  rsiValue: number | null;
  rsiDivergence: boolean;
  liquiditySweep: boolean;
  marketStructureBreak: boolean;
  cvdDivergence: boolean;
  oiSpike: boolean;
  score: number;
  entryPrice: number | null;
  stopLoss: number | null;
  takeProfit: number | null;
  conviction: string;
  signals: string[];
}

interface ScanCardProps {
  result: ScanResult;
}

function fmtPrice(n: number) {
  if (n >= 10000) return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (n >= 100) return n.toFixed(2);
  if (n >= 1) return n.toFixed(3);
  return n.toFixed(5);
}

export default function ScanCard({ result: r }: ScanCardProps) {
  // Динамично калкулиране на Risk-to-Reward (R:R) ratio
  const entry = r.entryPrice ?? r.price;
  const stop = r.stopLoss ?? entry;
  const tp = r.takeProfit ?? entry;

  const risk = Math.abs(stop - entry);
  const reward = Math.abs(entry - tp);
  const rrRatio = risk > 0 ? (reward / risk).toFixed(2) : "2.50";

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="font-bold text-slate-100 text-lg">
              {r.symbol.replace("USDT", "")}
            </span>
            <span className="text-xs text-slate-500 font-normal">/USDT</span>
            <span
              className={`ml-2 text-xs font-semibold ${
                r.priceChange24h >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {r.priceChange24h >= 0 ? "+" : ""}
              {r.priceChange24h.toFixed(2)}%
            </span>
          </div>
          <ConvictionBadge conviction={r.conviction} size="sm" />
        </div>

        <div className="text-xl font-mono font-bold text-slate-200 mb-3">
          ${fmtPrice(r.price)}
        </div>

        {/* Score & Metrics */}
        <div className="grid grid-cols-3 gap-2 bg-slate-950/40 p-2 rounded-lg border border-slate-800/60 text-center mb-3">
          <div>
            <div className="text-[10px] text-slate-500 uppercase">Funding</div>
            <div
              className={`text-xs font-mono font-bold ${
                r.fundingRate > 0.0005
                  ? "text-red-400"
                  : r.fundingRate > 0.0002
                  ? "text-amber-400"
                  : "text-slate-300"
              }`}
            >
              {(r.fundingRate * 100).toFixed(4)}%
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase">OI Δ</div>
            <div
              className={`text-xs font-mono font-bold ${
                r.openInterestChange > 10
                  ? "text-red-400"
                  : r.openInterestChange > 5
                  ? "text-amber-400"
                  : "text-slate-300"
              }`}
            >
              {r.openInterestChange > 0 ? "+" : ""}
              {r.openInterestChange.toFixed(1)}%
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase">RSI 4h</div>
            <div
              className={`text-xs font-mono font-bold ${
                r.rsiValue && r.rsiValue > 70
                  ? "text-red-400"
                  : r.rsiValue && r.rsiValue > 60
                  ? "text-amber-400"
                  : "text-slate-300"
              }`}
            >
              {r.rsiValue ? r.rsiValue.toFixed(1) : "—"}
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {r.liquiditySweep && (
            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] px-2 py-0.5 rounded font-medium flex items-center gap-1">
              ⚡ Liq. Sweep
            </span>
          )}
          {r.cvdDivergence && (
            <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] px-2 py-0.5 rounded font-medium flex items-center gap-1">
              📊 CVD Div
            </span>
          )}
          {r.oiSpike && (
            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] px-2 py-0.5 rounded font-medium flex items-center gap-1">
              ⚠️ OI Spike
            </span>
          )}
          {r.marketStructureBreak && (
            <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] px-2 py-0.5 rounded font-medium flex items-center gap-1">
              🔻 MSB
            </span>
          )}
          {r.rsiDivergence && (
            <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] px-2 py-0.5 rounded font-medium flex items-center gap-1">
              📉 RSI Div
            </span>
          )}
        </div>
      </div>

      {/* Trade Levels */}
      <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
        <div className="grid grid-cols-3 gap-1 text-center text-[11px] mb-1">
          <div>
            <div className="text-slate-500 text-[9px] uppercase">Вход</div>
            <div className="font-mono font-bold text-slate-200">${fmtPrice(entry)}</div>
          </div>
          <div>
            <div className="text-red-400 text-[9px] uppercase">Stop</div>
            <div className="font-mono font-bold text-red-400">${fmtPrice(stop)}</div>
          </div>
          <div>
            <div className="text-green-400 text-[9px] uppercase">TP</div>
            <div className="font-mono font-bold text-green-400">${fmtPrice(tp)}</div>
          </div>
        </div>
        <div className="text-[10px] text-slate-500 font-mono text-center">
          R:R = 1:{rrRatio}
        </div>
      </div>
    </div>
  );
}
