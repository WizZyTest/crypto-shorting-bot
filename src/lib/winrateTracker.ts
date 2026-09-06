import { getSignals, saveSignals } from './signalStore';

export async function evaluatePendingSignals() {
  const signals = getSignals();
  const pendingSignals = signals.filter((s) => s.status === 'PENDING');

  if (pendingSignals.length === 0) return { updated: 0 };

  let updatedCount = 0;
  const maxHoursPending = 24; // Сигналът изтича след 24ч без ударен TP/SL

  for (const signal of pendingSignals) {
    try {
      // Дърпаме High/Low свещите от момента на сигнала до сега от Binance
      const res = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${signal.symbol}&interval=15m&startTime=${signal.timestamp}`
      );
      if (!res.ok) continue;

      const klines: Array<[number, string, string, string, string, ...unknown[]]> = await res.json();
      
      let hitWin = false;
      let hitLoss = false;
      let closedPrice = signal.entryPrice;

      for (const kline of klines) {
        const high = parseFloat(kline[2]);
        const low = parseFloat(kline[3]);

        // За Short позиция:
        // Take Profit се удря при Low <= TP
        // Stop Loss се удря при High >= SL
        if (low <= signal.takeProfit) {
          hitWin = true;
          closedPrice = signal.takeProfit;
          break;
        }
        if (high >= signal.stopLoss) {
          hitLoss = true;
          closedPrice = signal.stopLoss;
          break;
        }
      }

      if (hitWin) {
        signal.status = 'WIN';
        signal.closedPrice = closedPrice;
        signal.closedAt = Date.now();
        signal.pnlPercent = Number((((signal.entryPrice - closedPrice) / signal.entryPrice) * 100).toFixed(2));
        updatedCount++;
      } else if (hitLoss) {
        signal.status = 'LOSS';
        signal.closedPrice = closedPrice;
        signal.closedAt = Date.now();
        signal.pnlPercent = Number((((signal.entryPrice - closedPrice) / signal.entryPrice) * 100).toFixed(2));
        updatedCount++;
      } else {
        // Проверка за изтичане
        const hoursElapsed = (Date.now() - signal.timestamp) / (1000 * 60 * 60);
        if (hoursElapsed >= maxHoursPending) {
          signal.status = 'EXPIRED';
          signal.closedAt = Date.now();
          signal.pnlPercent = 0;
          updatedCount++;
        }
      }
    } catch (err) {
      console.error(`Error updating signal for ${signal.symbol}:`, err);
    }
  }

  if (updatedCount > 0) {
    saveSignals(signals);
  }

  return { updated: updatedCount };
}
