"use client";

import ConvictionBadge from "./ConvictionBadge";
import ScoreBar from "./ScoreBar";
import SignalBadge from "./SignalBadge";

interface ScanCardProps {
  result: {
    symbol: string;
    price: number;
    priceChange24h: number;
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
  };
}

function fmt(n: number, decimals = 2) {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return n.toFixed(decimals);
}

function fmtPrice(n: number) {
  if (n >= 10000) return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (n >= 100) return n.toFixed(2);
  if (n >= 1) return n.toFixed(3);
  return n.toFixed(5);
}

export default function ScanCard({ result }: ScanCardProps) {
  const cardClass =
    result.conviction === "HIGH"
      ? "card-high"
      : result.conviction === "MEDIUM"
        ? "card-medium"
        : "card-low";

  const rrRatio =
    result.entryPrice && result.stopLoss && result.takeProfit
      ? (
          Math.abs(result.entryPrice - result.takeProfit) /
          Math.abs(result.stopLoss - result.entryPrice)
        ).toFixed(2)
      : null;

  return (
    <div
      className={`rounded-xl p-4 transition-all duration-200 hover:scale-[1.01] ${cardClass}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white">{result.symbol.replace("USDT", "")}</span>
            <span className="text-xs text-slate-500">/USDT</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-base font-semibold text-slate-200">
              ${fmtPrice(result.price)}
            </span>
            <span
              className={`text-xs font-medium ${result.priceChange24h >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {result.priceChange24h >= 0 ? "+" : ""}
              {result.priceChange24h.toFixed(2)}%
            </span>
          </div>
        </div>
        <ConvictionBadge conviction={result.conviction} />
      </div>

      {/* Score Bar */}
      <div className="mb-3">
        <ScoreBar score={result.score} />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-slate-900/60 rounded-lg p-2 text-center">
          <div className="text-[10px] text-slate-500 uppercase tracking-wide mb-0.5">Funding</div>
          <div
            className={`text-sm font-bold ${result.fundingRate > 0.003 ? "text-red-400" : result.fundingRate > 0.001 ? "text-amber-400" : "text-slate-300"}`}
          >
            {(result.fundingRate * 100).toFixed(4)}%
          </div>
        </div>
        <div className="bg-slate-900/60 rounded-lg p-2 text-center">
          <div className="text-[10px] text-slate-500 uppercase tracking-wide mb-0.5">OI Δ</div>
          <div
            className={`text-sm font-bold ${result.openInterestChange > 10 ? "text-red-400" : result.openInterestChange > 5 ? "text-amber-400" : "text-slate-300"}`}
          >
            {result.openInterestChange > 0 ? "+" : ""}
            {result.openInterestChange.toFixed(1)}%
          </div>
        </div>
        <div className="bg-slate-900/60 rounded-lg p-2 text-center">
          <div className="text-[10px] text-slate-500 uppercase tracking-wide mb-0.5">RSI 4h</div>
          <div
            className={`text-sm font-bold ${result.rsiValue && result.rsiValue > 70 ? "text-red-400" : result.rsiValue && result.rsiValue > 60 ? "text-amber-400" : "text-slate-300"}`}
          >
            {result.rsiValue ? result.rsiValue.toFixed(1) : "—"}
          </div>
        </div>
      </div>

      {/* Signal Badges */}
      <div className="flex flex-wrap gap-1 mb-3">
        <SignalBadge label="Liq. Sweep" active={result.liquiditySweep} icon="⚡" color="red" />
        <SignalBadge label="RSI Div" active={result.rsiDivergence} icon="📉" color="amber" />
        <SignalBadge label="MSB" active={result.marketStructureBreak} icon="🔻" color="purple" />
        <SignalBadge label="CVD Div" active={result.cvdDivergence} icon="📊" color="blue" />
        <SignalBadge label="OI Spike" active={result.oiSpike} icon="⚠️" color="amber" />
      </div>

      {/* Trade Levels */}
      {result.entryPrice && result.stopLoss && result.takeProfit && (
        <div className="border-t border-slate-700/50 pt-3">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wide mb-0.5">Вход</div>
              <div className="text-xs font-semibold text-blue-400">
                ${fmtPrice(result.entryPrice)}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wide mb-0.5">Stop</div>
              <div className="text-xs font-semibold text-red-400">
                ${fmtPrice(result.stopLoss)}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wide mb-0.5">TP</div>
              <div className="text-xs font-semibold text-green-400">
                ${fmtPrice(result.takeProfit)}
              </div>
            </div>
          </div>
          {rrRatio && (
            <div className="text-center mt-1.5">
              <span className="text-[10px] text-slate-500">R:R = </span>
              <span className="text-[10px] font-bold text-purple-400">1:{rrRatio}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
