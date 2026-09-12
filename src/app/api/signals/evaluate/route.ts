import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { SignalRecord } from '@/types/signal';

const filePath = path.join(process.cwd(), 'data', 'signals.json');

function getSignals(): SignalRecord[] {
  try {
    if (!fs.existsSync(filePath)) return [];
    const fileData = fs.readFileSync(filePath, 'utf8').trim();
    if (!fileData) return [];
    return JSON.parse(fileData);
  } catch {
    return [];
  }
}

function saveSignals(signals: SignalRecord[]) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(signals, null, 2));
}

// Дърпане на живи цени от Binance Futures API (fapi)
async function fetchBinanceFuturesPrices(): Promise<Record<string, number>> {
  const endpoints = [
    'https://fapi.binance.com/fapi/v1/ticker/price',
    'https://fapi1.binance.com/fapi/v1/ticker/price',
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        next: { revalidate: 0 },
      });

      if (res.ok) {
        const tickers = await res.json();
        const priceMap: Record<string, number> = {};
        if (Array.isArray(tickers)) {
          tickers.forEach((t: { symbol: string; price: string }) => {
            priceMap[t.symbol] = parseFloat(t.price);
          });
          return priceMap;
        }
      }
    } catch {
      // Продължаваме към следващия ендпойнт
    }
  }

  return {};
}

export async function POST() {
  try {
    const signals = getSignals();
    if (signals.length === 0) {
      return NextResponse.json({ success: true, signals: [] });
    }

    const priceMap = await fetchBinanceFuturesPrices();

    if (Object.keys(priceMap).length === 0) {
      return NextResponse.json({ success: false, message: 'Could not fetch Futures prices from Binance', signals });
    }

    let fileNeedsSave = false;

    for (const sig of signals) {
      if (sig.status === 'PENDING') {
        const currentPrice = priceMap[sig.symbol];

        if (currentPrice && currentPrice > 0) {
          // За Short позиции:
          // WIN: текущата цена е паднала до или под Take Profit
          if (currentPrice <= sig.takeProfit) {
            sig.status = 'WIN';
            sig.pnlPercent = Number((((sig.entryPrice - sig.takeProfit) / sig.entryPrice) * 100).toFixed(2));
            fileNeedsSave = true;
          }
          // LOSS: текущата цена се е качила до или над Stop Loss
          else if (currentPrice >= sig.stopLoss) {
            sig.status = 'LOSS';
            sig.pnlPercent = Number((((sig.entryPrice - sig.stopLoss) / sig.entryPrice) * 100).toFixed(2));
            fileNeedsSave = true;
          }
          // PENDING: изчисляване на плаващия PnL за Short: ((entry - current) / entry) * 100
          else {
            const floatingPnl = ((sig.entryPrice - currentPrice) / sig.entryPrice) * 100;
            sig.pnlPercent = Number(floatingPnl.toFixed(2));
            fileNeedsSave = true;
          }
        }
      }
    }

    if (fileNeedsSave) {
      saveSignals(signals);
    }

    return NextResponse.json({ success: true, signals });
  } catch (error) {
    console.error('Error evaluating signals:', error);
    return NextResponse.json({ error: 'Failed to evaluate signals' }, { status: 500 });
  }
}
