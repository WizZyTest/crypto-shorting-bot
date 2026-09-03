"use client";

import { useState, useEffect, useCallback } from "react";
import ScannerControls from "@/components/ScannerControls";
import ResultsTable from "@/components/ResultsTable";
import ScanCard from "@/components/ScanCard";
import AlertsPanel from "@/components/AlertsPanel";
import MarketOverview from "@/components/MarketOverview";

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
  scannedAt: string;
}

interface LastScan {
  totalScanned: number;
  highConviction: number;
  mediumConviction: number;
  lowConviction: number;
  scannedAt: string;
}

type ViewMode = "cards" | "table";
type FilterMode = "ALL" | "HIGH" | "MEDIUM";

export default function Home() {
  const [results, setResults] = useState<ScanResult[]>([]);
  const [lastScan, setLastScan] = useState<LastScan | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [filter, setFilter] = useState<FilterMode>("ALL");
  const [activeTab, setActiveTab] = useState<"scanner" | "market" | "alerts">("scanner");

  const fetchResults = useCallback(async () => {
    try {
      const res = await fetch("/api/scan");
      const data = await res.json();
      setResults(data.results ?? []);
      setLastScan(data.lastScan ?? null);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const handleScanComplete = useCallback(() => {
    fetchResults();
  }, [fetchResults]);

  const stats = {
    scanned: lastScan?.totalScanned ?? 0,
    highConviction: lastScan?.highConviction ?? 0,
    mediumConviction: lastScan?.mediumConviction ?? 0,
    lastScanTime: lastScan?.scannedAt ?? null,
  };

  const filteredForCards = results.filter((r) => {
    if (filter === "HIGH") return r.conviction === "HIGH";
    if (filter === "MEDIUM") return r.conviction === "HIGH" || r.conviction === "MEDIUM";
    return true;
  });

  const highCount = results.filter((r) => r.conviction === "HIGH").length;
  const medCount = results.filter((r) => r.conviction === "MEDIUM").length;

  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      {/* Header */}
      <header className="border-b border-[#1e2d47] bg-[#0f1629]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">📉</div>
              <div>
                <h1 className="text-lg font-bold text-white leading-tight">
                  Crypto Short Scanner
                </h1>
                <p className="text-xs text-slate-500">
                  OI · Funding · RSI Div · Liquidity Sweep · MSB
                </p>
              </div>
            </div>

            {/* Desktop stats */}
            <div className="hidden md:flex items-center gap-4">
              {lastScan && (
                <>
                  <div className="text-center">
                    <div className="text-xs text-slate-500">High Conviction</div>
                    <div className="text-lg font-bold text-red-400">{lastScan.highConviction}</div>
                  </div>
                  <div className="w-px h-8 bg-slate-700" />
                  <div className="text-center">
                    <div className="text-xs text-slate-500">Сканирани</div>
                    <div className="text-lg font-bold text-slate-200">{lastScan.totalScanned}</div>
                  </div>
                  <div className="w-px h-8 bg-slate-700" />
                </>
              )}
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-slate-400">Binance Futures</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile tab nav */}
      <div className="lg:hidden border-b border-[#1e2d47] bg-[#0f1629]">
        <div className="flex">
          {(["scanner", "market", "alerts"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-xs font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "text-white border-b-2 border-red-500"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {tab === "scanner" ? "🎯 Скенер" : tab === "market" ? "📊 Пазар" : "🔔 Сигнали"}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr_300px] gap-6">
          {/* Left column: Controls + Market Overview */}
          <div
            className={`space-y-4 ${activeTab !== "scanner" && activeTab !== "market" ? "hidden lg:block" : activeTab === "market" ? "block lg:block" : "block lg:block"}`}
          >
            {/* On mobile, only show scanner controls in scanner tab */}
            <div className={activeTab === "market" ? "hidden lg:block" : "block"}>
              <ScannerControls onScanComplete={handleScanComplete} stats={stats} />
            </div>
            {/* On mobile, show market overview in market tab */}
            <div className={activeTab === "scanner" ? "hidden lg:block" : "block"}>
              <MarketOverview />
            </div>
          </div>

          {/* Center column: Results */}
          <div className={activeTab !== "scanner" ? "hidden lg:block" : "block"}>
            {/* Filter + view toggle bar */}
            <div className="flex items-center justify-between mb-4 bg-[#131929] border border-[#1e2d47] rounded-xl p-3">
              {/* Filter buttons */}
              <div className="flex items-center gap-1">
                {(["ALL", "HIGH", "MEDIUM"] as const).map((f) => {
                  const count =
                    f === "ALL"
                      ? results.length
                      : f === "HIGH"
                        ? highCount
                        : medCount;
                  return (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                        filter === f
                          ? f === "HIGH"
                            ? "bg-red-500/20 text-red-400 border border-red-500/40"
                            : f === "MEDIUM"
                              ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                              : "bg-slate-700 text-white"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      {f === "ALL" ? "Всички" : f}{" "}
                      <span className="opacity-60">({count})</span>
                    </button>
                  );
                })}
              </div>

              {/* View mode toggle */}
              <div className="flex items-center gap-1 bg-slate-900/60 rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode("cards")}
                  className={`px-3 py-1.5 rounded-md text-xs transition-all ${viewMode === "cards" ? "bg-slate-700 text-white" : "text-slate-500 hover:text-slate-300"}`}
                >
                  ⊞ Карти
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-1.5 rounded-md text-xs transition-all ${viewMode === "table" ? "bg-slate-700 text-white" : "text-slate-500 hover:text-slate-300"}`}
                >
                  ☰ Таблица
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="bg-[#131929] border border-[#1e2d47] rounded-xl p-4">
              {viewMode === "cards" ? (
                <div>
                  {filteredForCards.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="text-5xl mb-4">🔍</div>
                      <div className="text-slate-400 font-semibold text-lg">
                        Няма резултати
                      </div>
                      <div className="text-slate-600 text-sm mt-2">
                        Натисни „Стартирай Скан" за да анализираш пазара
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                      {filteredForCards.map((r) => (
                        <div key={r.id} className="animate-fade-in-up">
                          <ScanCard result={r} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <ResultsTable results={results} filter={filter} />
              )}
            </div>
          </div>

          {/* Right column: Alerts */}
          <div className={activeTab !== "alerts" ? "hidden lg:block" : "block"}>
            <AlertsPanel />
          </div>
        </div>

        {/* How it works section */}
        {results.length === 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#131929] border border-[#1e2d47] rounded-xl p-5">
              <div className="text-2xl mb-3">🔬</div>
              <h3 className="font-bold text-white mb-2">1. Скениране</h3>
              <p className="text-sm text-slate-400">
                Извлича топ 100 монети по обем от Binance Futures. Анализира Open Interest,
                Funding Rate и ценова структура в реално време.
              </p>
            </div>
            <div className="bg-[#131929] border border-[#1e2d47] rounded-xl p-5">
              <div className="text-2xl mb-3">🧮</div>
              <h3 className="font-bold text-white mb-2">2. Оценяване</h3>
              <p className="text-sm text-slate-400">
                Всеки сигнал носи точки: Liquidity Sweep (+3), RSI Div (+2), MSB (+2), OI Spike (+2),
                CVD Div (+2), Funding Rate (+1-3). Score ≥7 = HIGH.
              </p>
            </div>
            <div className="bg-[#131929] border border-[#1e2d47] rounded-xl p-5">
              <div className="text-2xl mb-3">🎯</div>
              <h3 className="font-bold text-white mb-2">3. Нива за Търговия</h3>
              <p className="text-sm text-slate-400">
                Автоматично изчислява Entry (текуща цена), Stop-Loss (над обира на ликвидност + 0.3%)
                и Take Profit (най-близкото ниво на ликвидност отдолу).
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-[#1e2d47] mt-8 py-4">
        <div className="max-w-[1600px] mx-auto px-4 text-center">
          <p className="text-xs text-slate-600">
            ⚠️ Само за информационни цели. Не е финансов съвет. Търгувайте с управление на риска.
          </p>
        </div>
      </footer>
    </div>
  );
}
