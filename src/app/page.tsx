"use client";

import { useState, useEffect, useCallback } from "react";
import ScannerControls from "@/components/ScannerControls";
import ScanCard from "@/components/ScanCard";
import ResultsTable from "@/components/ResultsTable";
import AlertsPanel from "@/components/AlertsPanel";
import WinRateDashboard from "@/components/WinRateDashboard";

export default function Home() {
  const [results, setResults] = useState<any[]>([]);
  const [alertsHistory, setAlertsHistory] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanTime, setLastScanTime] = useState<string | null>(null);

  // 1. При първоначално зареждане / refresh дърпаме запазените резултати от /api/scan и историята от localStorage
  useEffect(() => {
    // Четене на историята от localStorage
    try {
      const savedAlerts = localStorage.getItem("crypto_alerts_history");
      if (savedAlerts) {
        setAlertsHistory(JSON.parse(savedAlerts));
      }
    } catch (e) {
      console.error("Грешка при четене от localStorage:", e);
    }

    // Зареждане на последните сканирани монети от бекенда
    fetch("/api/scan")
      .then((res) => res.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setResults(data.results);
          if (data.timestamp) {
            setLastScanTime(new Date(data.timestamp).toLocaleTimeString());
          }
        }
      })
      .catch((err) => console.error("Грешка при първоначално зареждане на скана:", err));
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

  // 2. Логика за ново сканиране при натискане на бутона (POST)
  const handleScan = useCallback(async () => {
    setIsScanning(true);
    try {
      const res = await fetch("/api/scan", { method: "POST" });
      const data = await res.json();

      if (data.results && data.results.length > 0) {
        setResults(data.results);

        const currentTime = new Date().toLocaleTimeString();

        // Филтрираме само монети със score >= 7
        const newHighScoreAlerts = data.results
          .filter((r: any) => r.score >= 7)
          .map((item: any) => ({
            ...item,
            alertId: `${item.symbol}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            scannedAt: currentTime,
          }));

        if (newHighScoreAlerts.length > 0) {
          // Запазваме ги в локалния alertsHistory state
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

          // Изпращаме новите сигнали към backend за Win-Rate проследяване
          newHighScoreAlerts.forEach((sig: any) => {
            fetch("/api/signals", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                symbol: sig.symbol,
                entryPrice: sig.price || sig.entryPrice,
                takeProfit: sig.takeProfit || (sig.price ? sig.price * 0.91 : 0),
                stopLoss: sig.stopLoss || (sig.price ? sig.price * 1.03 : 0),
                score: sig.score,
                conviction: sig.conviction,
              }),
            }).catch((err) => console.error("Грешка при изпращане на сигнал:", err));
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

  const highCount = results.filter((r) => r.conviction === "HIGH").length;
  const mediumCount = results.filter((r) => r.conviction === "MEDIUM").length;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 space-y-6">
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

        {/* Win-Rate & Performance Dashboard */}
        <section className="w-full">
          <WinRateDashboard />
        </section>
      </div>
    </main>
  );
}
