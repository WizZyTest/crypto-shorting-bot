const FAPI_BASE = "https://fapi.binance.com";

export interface FuturesTicker {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  lastPrice: string;
  volume: string;
  quoteVolume: string;
}

export interface FundingRate {
  symbol: string;
  fundingRate: string;
  fundingTime: number;
}

export interface OpenInterest {
  symbol: string;
  openInterest: string;
  time: number;
}

export interface OpenInterestHist {
  symbol: string;
  sumOpenInterest: string;
  sumOpenInterestValue: string;
  timestamp: number;
}

export interface Kline {
  openTime: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  closeTime: number;
  quoteAssetVolume: string;
  numberOfTrades: number;
  takerBuyBaseAssetVolume: string;
  takerBuyQuoteAssetVolume: string;
}

export interface PremiumIndex {
  symbol: string;
  markPrice: string;
  lastFundingRate: string;
  nextFundingTime: number;
}

async function fetchWithTimeout(url: string, timeoutMs = 8000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal, cache: "no-store" });
    clearTimeout(id);
    return res;
  } catch (e) {
    clearTimeout(id);
    throw e;
  }
}

export async function getTopFuturesSymbols(limit = 100): Promise<string[]> {
  try {
    const res = await fetchWithTimeout(`${FAPI_BASE}/fapi/v1/ticker/24hr`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: FuturesTicker[] = await res.json();
    return data
      .filter((t) => t.symbol.endsWith("USDT"))
      .sort((a, b) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
      .slice(0, limit)
      .map((t) => t.symbol);
  } catch {
    return [];
  }
}

export async function getTicker24hr(symbol: string): Promise<FuturesTicker | null> {
  try {
    const res = await fetchWithTimeout(
      `${FAPI_BASE}/fapi/v1/ticker/24hr?symbol=${symbol}`
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function getAllTickers(): Promise<FuturesTicker[]> {
  try {
    const res = await fetchWithTimeout(`${FAPI_BASE}/fapi/v1/ticker/24hr`);
    if (!res.ok) return [];
    const data: FuturesTicker[] = await res.json();
    return data.filter((t) => t.symbol.endsWith("USDT"));
  } catch {
    return [];
  }
}

export async function getPremiumIndex(symbol: string): Promise<PremiumIndex | null> {
  try {
    const res = await fetchWithTimeout(
      `${FAPI_BASE}/fapi/v1/premiumIndex?symbol=${symbol}`
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function getAllPremiumIndex(): Promise<PremiumIndex[]> {
  try {
    const res = await fetchWithTimeout(`${FAPI_BASE}/fapi/v1/premiumIndex`);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getOpenInterest(symbol: string): Promise<OpenInterest | null> {
  try {
    const res = await fetchWithTimeout(
      `${FAPI_BASE}/fapi/v1/openInterest?symbol=${symbol}`
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function getOpenInterestHist(
  symbol: string,
  period = "1h",
  limit = 10
): Promise<OpenInterestHist[]> {
  try {
    const res = await fetchWithTimeout(
      `${FAPI_BASE}/futures/data/openInterestHist?symbol=${symbol}&period=${period}&limit=${limit}`
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function getKlines(
  symbol: string,
  interval: string,
  limit = 100
): Promise<Kline[]> {
  try {
    const res = await fetchWithTimeout(
      `${FAPI_BASE}/fapi/v1/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
    );
    if (!res.ok) return [];
    const raw: unknown[][] = await res.json();
    return raw.map((k) => ({
      openTime: k[0] as number,
      open: k[1] as string,
      high: k[2] as string,
      low: k[3] as string,
      close: k[4] as string,
      volume: k[5] as string,
      closeTime: k[6] as number,
      quoteAssetVolume: k[7] as string,
      numberOfTrades: k[8] as number,
      takerBuyBaseAssetVolume: k[9] as string,
      takerBuyQuoteAssetVolume: k[10] as string,
    }));
  } catch {
    return [];
  }
}

export async function getLongShortRatio(symbol: string): Promise<number | null> {
  try {
    const res = await fetchWithTimeout(
      `${FAPI_BASE}/futures/data/globalLongShortAccountRatio?symbol=${symbol}&period=5m&limit=1`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data && data.length > 0 ? parseFloat(data[0].longShortRatio) : null;
  } catch {
    return null;
  }
}

export async function getTakerBuySellRatio(symbol: string): Promise<number | null> {
  try {
    const res = await fetchWithTimeout(
      `${FAPI_BASE}/futures/data/takerlongshortRatio?symbol=${symbol}&period=5m&limit=1`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data && data.length > 0 ? parseFloat(data[0].buySellRatio) : null;
  } catch {
    return null;
  }
}
