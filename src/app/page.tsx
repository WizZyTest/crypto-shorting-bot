"use client";

import { useState, useEffect, useCallback } from "react";
import ScannerControls from "@/components/ScannerControls";
import ScanCard from "@/components/ScanCard";
import ResultsTable from "@/components/ResultsTable";
import AlertsPanel from "@/components/AlertsPanel";

export default function Home() {
  const [results, setResults] = useState<any[]>([]);
  const [alertsHistory, setAlertsHistory] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanTime, setLastScanTime] = useState<string | null>(null);

  // 1. Зареждаме историята от localStorage при първоначално стартиране
  useEffect(() => {
    try {
      const savedAlerts = localStorage.getItem("crypto_alerts_history");
      if (savedAlerts) {
        setAlertsHistory(JSON.parse(savedAlerts));
      }
    } catch (e) {
      console.error("Грешка при четене от localStorage:", e);
    }
  }, []);

  // Функция за изтриване на конкретен сигнал по alertId
  const handleDeleteAlert = (alertIdToDelete: string) => {
    setAlertsHistory((prevAlerts) => {
      const updated = prevAlerts.filter((item) => item.alertId !== alertIdToDelete);
      try {
        localStorage.setItem("crypto_alerts_history", JSON.stringify(updated));
      } catch (e) {
        console.error("Грешка при запис в localStorage:", e);
      }
      return updated;
    });
  };

  // 2. Логика за сканиране
  const handleScan = useCallback(async () => {
    setIsScanning(true);
    try {
      const res = await fetch("/api/scan");
      const data = await res.json();

      if (data.results && data.results.length > 0) {
        setResults(data.results);

        const currentTime = new Date().toLocaleTimeString();

        // Филтрираме само монети със score >= 7
        const newHighScoreAlerts = data.results
          .filter((r: any) => r.score >= 7)
          .map((item: any) => ({
            ...item,
            // Добавяме уникално alertId за всеки сигнал
            alertId: `${item.symbol}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            scannedAt: currentTime,
          }));

        if (newHighScoreAlerts.length > 0) {
          setAlertsHistory((prevAlerts) => {
            const newHistory = [...newHighScoreAlerts, ...prevAlerts];

            try {
              localStorage.setItem(
                "crypto_alerts_history",
                JSON.stringify(newHistory)
              );
            } catch (e) {
              console.error("Грешка при запис в localStorage:", e);
            }

            return newHistory;
          });
        }

        setLastScanTime(currentTime);
      }
    } catch (error) {
      console.error("Грешка при сканиране:", error);
    } finally {
      setIsScanning(false);
    }
  }, []);

  // Стартираме скан веднъж при зареждане
  useEffect(() => {
    handleScan();
  }, [handleScan]);

  const highCount = results.filter((r) => r.conviction === "HIGH").length;
  const mediumCount = results.filter((r) => r.conviction === "MEDIUM").length;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <ScannerControls
              onScan={handleScan}
              isScanning={isScanning}
              totalScanned={results.length}
              highCount={highCount}
              mediumCount={mediumCount}
              lastScanTime={lastScanTime}
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {results.slice(0, 6).map((r) => (
                <ScanCard key={r.symbol} result={r} />
              ))}
            </div>

            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
              <ResultsTable results={results} filter="ALL" />
            </div>
          </div>

          <div className="lg:col-span-3">
            <AlertsPanel 
              results={alertsHistory} 
              onDeleteAlert={handleDeleteAlert} 
            />
          </div>
        </div>
      </div>
    </main>
  );
}
