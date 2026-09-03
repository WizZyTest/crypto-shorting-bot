module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/binance.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllPremiumIndex",
    ()=>getAllPremiumIndex,
    "getAllTickers",
    ()=>getAllTickers,
    "getKlines",
    ()=>getKlines,
    "getOpenInterest",
    ()=>getOpenInterest,
    "getOpenInterestHist",
    ()=>getOpenInterestHist,
    "getPremiumIndex",
    ()=>getPremiumIndex,
    "getTicker24hr",
    ()=>getTicker24hr,
    "getTopFuturesSymbols",
    ()=>getTopFuturesSymbols
]);
const FAPI_BASE = "https://fapi.binance.com";
async function fetchWithTimeout(url, timeoutMs = 8000) {
    const controller = new AbortController();
    const id = setTimeout(()=>controller.abort(), timeoutMs);
    try {
        const res = await fetch(url, {
            signal: controller.signal,
            cache: "no-store"
        });
        clearTimeout(id);
        return res;
    } catch (e) {
        clearTimeout(id);
        throw e;
    }
}
async function getTopFuturesSymbols(limit = 100) {
    try {
        const res = await fetchWithTimeout(`${FAPI_BASE}/fapi/v1/ticker/24hr`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return data.filter((t)=>t.symbol.endsWith("USDT")).sort((a, b)=>parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume)).slice(0, limit).map((t)=>t.symbol);
    } catch  {
        return [];
    }
}
async function getTicker24hr(symbol) {
    try {
        const res = await fetchWithTimeout(`${FAPI_BASE}/fapi/v1/ticker/24hr?symbol=${symbol}`);
        if (!res.ok) return null;
        return await res.json();
    } catch  {
        return null;
    }
}
async function getAllTickers() {
    try {
        const res = await fetchWithTimeout(`${FAPI_BASE}/fapi/v1/ticker/24hr`);
        if (!res.ok) return [];
        const data = await res.json();
        return data.filter((t)=>t.symbol.endsWith("USDT"));
    } catch  {
        return [];
    }
}
async function getPremiumIndex(symbol) {
    try {
        const res = await fetchWithTimeout(`${FAPI_BASE}/fapi/v1/premiumIndex?symbol=${symbol}`);
        if (!res.ok) return null;
        return await res.json();
    } catch  {
        return null;
    }
}
async function getAllPremiumIndex() {
    try {
        const res = await fetchWithTimeout(`${FAPI_BASE}/fapi/v1/premiumIndex`);
        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    } catch  {
        return [];
    }
}
async function getOpenInterest(symbol) {
    try {
        const res = await fetchWithTimeout(`${FAPI_BASE}/fapi/v1/openInterest?symbol=${symbol}`);
        if (!res.ok) return null;
        return await res.json();
    } catch  {
        return null;
    }
}
async function getOpenInterestHist(symbol, period = "1h", limit = 10) {
    try {
        const res = await fetchWithTimeout(`${FAPI_BASE}/futures/data/openInterestHist?symbol=${symbol}&period=${period}&limit=${limit}`);
        if (!res.ok) return [];
        return await res.json();
    } catch  {
        return [];
    }
}
async function getKlines(symbol, interval, limit = 100) {
    try {
        const res = await fetchWithTimeout(`${FAPI_BASE}/fapi/v1/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`);
        if (!res.ok) return [];
        const raw = await res.json();
        return raw.map((k)=>({
                openTime: k[0],
                open: k[1],
                high: k[2],
                low: k[3],
                close: k[4],
                volume: k[5],
                closeTime: k[6],
                quoteAssetVolume: k[7],
                numberOfTrades: k[8],
                takerBuyBaseAssetVolume: k[9],
                takerBuyQuoteAssetVolume: k[10]
            }));
    } catch  {
        return [];
    }
}
}),
"[project]/src/app/api/ticker/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$binance$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/binance.ts [app-route] (ecmascript)");
;
;
async function GET() {
    try {
        const [tickers, premiumIndexes] = await Promise.all([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$binance$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAllTickers"])(),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$binance$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAllPremiumIndex"])()
        ]);
        const fundingMap = new Map();
        for (const p of premiumIndexes){
            fundingMap.set(p.symbol, parseFloat(p.lastFundingRate));
        }
        const top20 = tickers.sort((a, b)=>parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume)).slice(0, 20).map((t)=>({
                symbol: t.symbol,
                price: parseFloat(t.lastPrice),
                change24h: parseFloat(t.priceChangePercent),
                volume24h: parseFloat(t.quoteVolume),
                fundingRate: fundingMap.get(t.symbol) ?? 0
            }));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            tickers: top20
        });
    } catch (err) {
        console.error("Ticker error:", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to fetch tickers"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0v.0g07._.js.map