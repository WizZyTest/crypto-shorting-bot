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
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/src/app/api/scan/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
;
const dynamic = "force-dynamic";
const scanFilePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "data", "last_scan.json");
// Помощна функция за четене на последните запазени монети от файла
function getLastScanData() {
    try {
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(scanFilePath)) return null;
        const fileData = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(scanFilePath, "utf8").trim();
        if (!fileData) return null;
        return JSON.parse(fileData);
    } catch  {
        return null;
    }
}
// Помощна функция за запазване на резултатите във файла
function saveScanData(data) {
    try {
        const dir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(scanFilePath);
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(dir)) __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdirSync(dir, {
            recursive: true
        });
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(scanFilePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Грешка при запазване на скана във файл:", error);
    }
}
// Изчисление на реален RSI (14)
function calculateRSI(prices, period = 14) {
    if (prices.length < period + 1) return 50;
    let gains = 0;
    let losses = 0;
    for(let i = 1; i <= period; i++){
        const change = prices[i] - prices[i - 1];
        if (change >= 0) gains += change;
        else losses += Math.abs(change);
    }
    let avgGain = gains / period;
    let avgLoss = losses / period;
    for(let i = period + 1; i < prices.length; i++){
        const change = prices[i] - prices[i - 1];
        if (change >= 0) {
            avgGain = (avgGain * 13 + change) / 14;
            avgLoss = avgLoss * 13 / 14;
        } else {
            avgGain = avgGain * 13 / 14;
            avgLoss = (avgLoss * 13 + Math.abs(change)) / 14;
        }
    }
    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return Math.round((100 - 100 / (1 + rs)) * 10) / 10;
}
// Основна логика за извършване на ново сканиране
async function executeScan() {
    // 1. Взимане на 24ч статистиките за всички фючърси
    const tickerRes = await fetch("https://fapi.binance.com/fapi/v1/ticker/24hr", {
        cache: "no-store"
    });
    const tickers = await tickerRes.json();
    if (!Array.isArray(tickers)) {
        throw new Error("Невалиден отговор от Binance");
    }
    // Взимаме топ 35 монети с НАЙ-ГОЛЯМ 24ч РЪСТ (най-добрите за шорт)
    const topGainers = tickers.filter((t)=>t.symbol.endsWith("USDT")).sort((a, b)=>parseFloat(b.priceChangePercent) - parseFloat(a.priceChangePercent)).slice(0, 35);
    // 2. Взимане на Funding Rates
    const premiumRes = await fetch("https://fapi.binance.com/fapi/v1/premiumIndex", {
        cache: "no-store"
    });
    const premiumData = await premiumRes.json();
    const fundingMap = new Map();
    if (Array.isArray(premiumData)) {
        premiumData.forEach((p)=>{
            fundingMap.set(p.symbol, parseFloat(p.lastFundingRate));
        });
    }
    // 3. Извличане на 4h свещи (Klines) и Open Interest
    const results = await Promise.all(topGainers.map(async (t, index)=>{
        const symbol = t.symbol;
        const price = parseFloat(t.lastPrice);
        const priceChange24h = parseFloat(t.priceChangePercent);
        const volume24h = parseFloat(t.quoteVolume);
        const fundingRate = fundingMap.get(symbol) || 0;
        let rsiValue = 50;
        let openInterestChange = 0;
        try {
            const klinesRes = await fetch(`https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}&interval=4h&limit=30`, {
                cache: "no-store"
            });
            const klines = await klinesRes.json();
            if (Array.isArray(klines) && klines.length >= 15) {
                const closePrices = klines.map((k)=>parseFloat(k[4]));
                rsiValue = calculateRSI(closePrices);
            }
            const oiRes = await fetch(`https://fapi.binance.com/fapi/v1/openInterest?symbol=${symbol}`, {
                cache: "no-store"
            });
            const oiData = await oiRes.json();
            if (oiData && oiData.openInterest) {
                openInterestChange = Math.round(parseFloat(oiData.openInterest) * price / volume24h * 10) / 10;
            }
        } catch (e) {
        // Игнориране при лимит от Binance API
        }
        const isHighFunding = fundingRate > 0.0003; // > 0.03%
        const isExtremePump = priceChange24h > 10; // > 10%
        const isOverbought = rsiValue >= 70;
        let score = 0;
        const signals = [];
        if (isHighFunding) {
            score += 3.5;
            signals.push(`🔥 Висок Funding: ${(fundingRate * 100).toFixed(4)}%`);
        }
        if (isExtremePump) {
            score += 3.5;
            signals.push(`🚀 24ч Ръст: +${priceChange24h.toFixed(2)}%`);
        }
        if (isOverbought) {
            score += 3.0;
            signals.push(`📉 RSI Свръхкупен (4h): ${rsiValue}`);
        }
        const conviction = score >= 7 ? "HIGH" : score >= 3.5 ? "MEDIUM" : "LOW";
        const stopLoss = price * 1.03;
        const takeProfit = price * 0.91;
        return {
            id: index + 1,
            symbol,
            price,
            priceChange24h,
            volume24h,
            fundingRate,
            openInterestChange,
            rsiValue,
            rsiDivergence: rsiValue > 75,
            liquiditySweep: isExtremePump,
            cvdDivergence: isHighFunding,
            oiSpike: openInterestChange > 10,
            score,
            entryPrice: price,
            stopLoss,
            takeProfit,
            conviction,
            signals,
            scannedAt: new Date().toLocaleTimeString()
        };
    }));
    const sortedResults = results.filter((r)=>r.score > 0).sort((a, b)=>b.score - a.score);
    const responseData = {
        success: true,
        timestamp: new Date().toISOString(),
        results: sortedResults
    };
    saveScanData(responseData);
    return responseData;
}
async function GET() {
    try {
        const savedData = getLastScanData();
        if (savedData) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(savedData);
        }
        const newData = await executeScan();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(newData);
    } catch (error) {
        console.error("Грешка при зареждане на скана:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error.message
        }, {
            status: 500
        });
    }
}
async function POST() {
    try {
        const newData = await executeScan();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(newData);
    } catch (error) {
        console.error("Сканирането пропадна:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0vc_yjj._.js.map