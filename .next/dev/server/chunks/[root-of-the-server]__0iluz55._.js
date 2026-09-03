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
"[project]/src/db/index.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "db",
    ()=>db,
    "pool",
    ()=>pool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/node-postgres/driver.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import, [project]/node_modules/pg)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error("DATABASE_URL is required");
}
const globalForDb = globalThis;
const pool = globalForDb.__arenaNextJsPostgresqlPool ?? new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__["Pool"]({
    connectionString: databaseUrl
});
if ("TURBOPACK compile-time truthy", 1) {
    globalForDb.__arenaNextJsPostgresqlPool = pool;
}
const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["drizzle"])(pool);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/db/schema.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "alerts",
    ()=>alerts,
    "scanHistory",
    ()=>scanHistory,
    "scanResults",
    ()=>scanResults
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/table.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/serial.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/text.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$real$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/real.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/integer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/timestamp.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/boolean.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/jsonb.js [app-route] (ecmascript)");
;
const scanResults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("scan_results", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    symbol: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("symbol").notNull(),
    price: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$real$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["real"])("price").notNull(),
    priceChange24h: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$real$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["real"])("price_change_24h").notNull().default(0),
    volume24h: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$real$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["real"])("volume_24h").notNull().default(0),
    openInterest: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$real$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["real"])("open_interest").notNull().default(0),
    openInterestChange: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$real$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["real"])("open_interest_change").notNull().default(0),
    fundingRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$real$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["real"])("funding_rate").notNull().default(0),
    rsiValue: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$real$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["real"])("rsi_value"),
    rsiDivergence: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("rsi_divergence").notNull().default(false),
    liquiditySweep: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("liquidity_sweep").notNull().default(false),
    marketStructureBreak: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("market_structure_break").notNull().default(false),
    cvdDivergence: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("cvd_divergence").notNull().default(false),
    oiSpike: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("oi_spike").notNull().default(false),
    score: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$real$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["real"])("score").notNull().default(0),
    entryPrice: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$real$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["real"])("entry_price"),
    stopLoss: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$real$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["real"])("stop_loss"),
    takeProfit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$real$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["real"])("take_profit"),
    conviction: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("conviction").notNull().default("LOW"),
    signals: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonb"])("signals").$type().notNull().default([]),
    scannedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("scanned_at").notNull().defaultNow()
});
const scanHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("scan_history", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    totalScanned: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("total_scanned").notNull().default(0),
    highConviction: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("high_conviction").notNull().default(0),
    mediumConviction: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("medium_conviction").notNull().default(0),
    lowConviction: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("low_conviction").notNull().default(0),
    scannedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("scanned_at").notNull().defaultNow()
});
const alerts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("alerts", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    symbol: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("symbol").notNull(),
    score: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$real$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["real"])("score").notNull(),
    conviction: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("conviction").notNull(),
    entryPrice: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$real$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["real"])("entry_price"),
    stopLoss: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$real$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["real"])("stop_loss"),
    takeProfit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$real$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["real"])("take_profit"),
    signals: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonb"])("signals").$type().notNull().default([]),
    isRead: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("is_read").notNull().default(false),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow()
});
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
"[project]/src/lib/indicators.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateRSI",
    ()=>calculateRSI,
    "detectBearishDivergence",
    ()=>detectBearishDivergence,
    "detectCVDDivergence",
    ()=>detectCVDDivergence,
    "detectLiquiditySweep",
    ()=>detectLiquiditySweep,
    "detectMarketStructureBreak",
    ()=>detectMarketStructureBreak,
    "detectOISpike",
    ()=>detectOISpike
]);
function calculateRSI(closes, period = 14) {
    if (closes.length < period + 1) return [];
    const rsi = [];
    let gains = 0;
    let losses = 0;
    for(let i = 1; i <= period; i++){
        const diff = closes[i] - closes[i - 1];
        if (diff >= 0) gains += diff;
        else losses += Math.abs(diff);
    }
    let avgGain = gains / period;
    let avgLoss = losses / period;
    const firstRS = avgLoss === 0 ? 100 : avgGain / avgLoss;
    rsi.push(100 - 100 / (1 + firstRS));
    for(let i = period + 1; i < closes.length; i++){
        const diff = closes[i] - closes[i - 1];
        const gain = diff >= 0 ? diff : 0;
        const loss = diff < 0 ? Math.abs(diff) : 0;
        avgGain = (avgGain * (period - 1) + gain) / period;
        avgLoss = (avgLoss * (period - 1) + loss) / period;
        const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
        rsi.push(100 - 100 / (1 + rs));
    }
    return rsi;
}
function detectBearishDivergence(klines) {
    if (klines.length < 30) return false;
    const closes = klines.map((k)=>parseFloat(k.close));
    const highs = klines.map((k)=>parseFloat(k.high));
    const rsi = calculateRSI(closes, 14);
    if (rsi.length < 10) return false;
    const lookback = Math.min(30, rsi.length);
    const recentRSI = rsi.slice(-lookback);
    const recentHighs = highs.slice(-lookback);
    // Find two swing highs
    const swingHighs = [];
    for(let i = 2; i < recentHighs.length - 2; i++){
        if (recentHighs[i] > recentHighs[i - 1] && recentHighs[i] > recentHighs[i - 2] && recentHighs[i] > recentHighs[i + 1] && recentHighs[i] > recentHighs[i + 2]) {
            swingHighs.push({
                idx: i,
                price: recentHighs[i],
                rsi: recentRSI[i]
            });
        }
    }
    if (swingHighs.length < 2) return false;
    const last = swingHighs[swingHighs.length - 1];
    const prev = swingHighs[swingHighs.length - 2];
    // Price higher high but RSI lower high = bearish divergence
    return last.price > prev.price && last.rsi < prev.rsi;
}
function detectLiquiditySweep(klines) {
    if (klines.length < 20) return false;
    const recent = klines.slice(-20);
    const lastCandle = recent[recent.length - 1];
    const prevCandles = recent.slice(0, -3);
    // Find recent equal highs / resistance
    const prevHighs = prevCandles.map((k)=>parseFloat(k.high));
    const maxPrevHigh = Math.max(...prevHighs);
    const lastHigh = parseFloat(lastCandle.high);
    const lastClose = parseFloat(lastCandle.close);
    const lastOpen = parseFloat(lastCandle.open);
    // Price swept above resistance but closed back below it
    if (lastHigh > maxPrevHigh && lastClose < maxPrevHigh) {
        // Bearish close (close below open)
        if (lastClose < lastOpen) return true;
    }
    // Also check last 2 candles for sweep pattern
    const prevLast = recent[recent.length - 2];
    if (prevLast) {
        const prevLastHigh = parseFloat(prevLast.high);
        const prevLastClose = parseFloat(prevLast.close);
        const prevLastOpen = parseFloat(prevLast.open);
        const prevMaxHigh = Math.max(...prevHighs.slice(0, -1));
        if (prevLastHigh > prevMaxHigh && prevLastClose < prevMaxHigh && prevLastClose < prevLastOpen) {
            return true;
        }
    }
    return false;
}
function detectMarketStructureBreak(klines) {
    if (klines.length < 15) return false;
    const recent = klines.slice(-15);
    const lows = recent.map((k)=>parseFloat(k.low));
    const closes = recent.map((k)=>parseFloat(k.close));
    // Find swing lows (Higher Lows)
    const swingLows = [];
    for(let i = 2; i < lows.length - 2; i++){
        if (lows[i] < lows[i - 1] && lows[i] < lows[i - 2] && lows[i] < lows[i + 1] && lows[i] < lows[i + 2]) {
            swingLows.push(lows[i]);
        }
    }
    if (swingLows.length < 2) return false;
    // Check if swing lows were forming higher lows
    const lastHL = swingLows[swingLows.length - 1];
    const prevHL = swingLows[swingLows.length - 2];
    const isHigherLow = lastHL > prevHL;
    if (!isHigherLow) return false;
    // Check if current price has broken below last Higher Low
    const currentClose = closes[closes.length - 1];
    return currentClose < lastHL;
}
function detectCVDDivergence(klines) {
    if (klines.length < 20) return false;
    const recent = klines.slice(-20);
    const firstHalf = recent.slice(0, 10);
    const secondHalf = recent.slice(10);
    const avgBuyVol1 = firstHalf.reduce((sum, k)=>sum + parseFloat(k.takerBuyBaseAssetVolume), 0) / firstHalf.length;
    const avgBuyVol2 = secondHalf.reduce((sum, k)=>sum + parseFloat(k.takerBuyBaseAssetVolume), 0) / secondHalf.length;
    const avgClose1 = firstHalf.reduce((sum, k)=>sum + parseFloat(k.close), 0) / firstHalf.length;
    const avgClose2 = secondHalf.reduce((sum, k)=>sum + parseFloat(k.close), 0) / secondHalf.length;
    // Price going up but buy volume going down
    return avgClose2 > avgClose1 && avgBuyVol2 < avgBuyVol1 * 0.85;
}
function detectOISpike(oiHistory) {
    if (oiHistory.length < 3) return false;
    const values = oiHistory.map((o)=>parseFloat(o.sumOpenInterest));
    const latest = values[values.length - 1];
    const prev = values[values.length - 2];
    const older = values[values.length - 3];
    if (prev === 0 || older === 0) return false;
    const recentGrowth = (latest - prev) / prev;
    const prevGrowth = (prev - older) / older;
    // OI jumped a lot in last period
    return recentGrowth > 0.03 || recentGrowth > 0.015 && prevGrowth > 0.01;
}
}),
"[project]/src/lib/scanner.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runScan",
    ()=>runScan
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$binance$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/binance.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$indicators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/indicators.ts [app-route] (ecmascript)");
;
;
function scoreResult(result) {
    let score = 0;
    const signals = [];
    // 1. Primary Market Action (High Conviction Signals)
    if (result.liquiditySweep) {
        score += 3;
        signals.push("Liquidity Sweep: Пробив над равен връх + затваряне под него ⚡");
    }
    if (result.fundingRate > 0.0003) {
        score += 2;
        signals.push(`Funding Rate: +${(result.fundingRate * 100).toFixed(3)}% (Скъп Long)`);
    }
    if (result.fundingRate > 0.0008) {
        score += 1;
        signals.push("Funding Rate: ЕКСТРЕМНО ВЕЛИК (>0.08%) 🔥");
    }
    if (result.cvdDivergence) {
        score += 2;
        signals.push("CVD Дивергенция: Ценови нов връх при спадащ Spot CVD 📊");
    }
    if (result.oiSpike) {
        score += 2;
        signals.push("OI Spike & Stall: Рязък скок на OI + спиране на импулса ⚡");
    } else if (result.openInterestChange > 8) {
        score += 1;
        signals.push(`OI Промяна: +${result.openInterestChange.toFixed(1)}%`);
    }
    // 2. Technical Structure Confirmations
    if (result.marketStructureBreak) {
        score += 1.5;
        signals.push("MSB: Пробив на 15m/1h Higher Low подкрепа 🔻");
    }
    if (result.rsiDivergence) {
        score += 1.5;
        signals.push("RSI Bearish Дивергенция: Нов връх на цената при по-нисък RSI 📉");
    }
    if (result.rsiValue !== null && result.rsiValue > 75) {
        score += 1;
        signals.push(`RSI Пренакупен: ${result.rsiValue.toFixed(1)}`);
    }
    // 3. Synergistic Combination Bonus (High Precision Short Setup)
    if (result.liquiditySweep && result.cvdDivergence) {
        score += 1.5;
        signals.push("COMBO: Liquidity Sweep + CVD Divergence 🔥");
    }
    return {
        score: Math.round(score * 10) / 10,
        signals
    };
}
function calcTradeLevels(price, klines, hasSweep) {
    const highs = klines.slice(-20).map((k)=>parseFloat(k.high));
    const lows = klines.slice(-20).map((k)=>parseFloat(k.low));
    const maxHigh = Math.max(...highs);
    const minLow = Math.min(...lows);
    // Approximate ATR(14) for volatility buffer
    let trSum = 0;
    const recent = klines.slice(-15);
    for(let i = 1; i < recent.length; i++){
        const h = parseFloat(recent[i].high);
        const l = parseFloat(recent[i].low);
        const prevC = parseFloat(recent[i - 1].close);
        const tr = Math.max(h - l, Math.abs(h - prevC), Math.abs(l - prevC));
        trSum += tr;
    }
    const atr = trSum / (recent.length - 1 || 1);
    const entryPrice = price;
    // Stop Loss: Above Liquidity Sweep high with ATR buffer (minimum 0.8%)
    const rawSL = hasSweep ? maxHigh + atr * 0.5 : price + atr * 1.5;
    const stopLoss = Math.max(rawSL, price * 1.008);
    // Take Profit: Targeting lowest pool of liquidity with R:R >= 1:2.5
    const risk = stopLoss - entryPrice;
    const minTarget = entryPrice - risk * 2.5;
    const takeProfit = Math.min(minLow, minTarget);
    return {
        entryPrice: Number(entryPrice.toFixed(6)),
        stopLoss: Number(stopLoss.toFixed(6)),
        takeProfit: Number(takeProfit.toFixed(6))
    };
}
async function runScan(topN = 100) {
    const [tickers, premiumIndexes] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$binance$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAllTickers"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$binance$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAllPremiumIndex"])()
    ]);
    if (!tickers || tickers.length === 0) return [];
    const topTickers = tickers.sort((a, b)=>parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume)).slice(0, topN);
    const fundingMap = new Map();
    for (const p of premiumIndexes){
        fundingMap.set(p.symbol, parseFloat(p.lastFundingRate));
    }
    const results = [];
    const BATCH_SIZE = 20;
    for(let i = 0; i < topTickers.length; i += BATCH_SIZE){
        const batch = topTickers.slice(i, i + BATCH_SIZE);
        const batchResults = await Promise.all(batch.map(async (ticker)=>{
            try {
                const symbol = ticker.symbol;
                const price = parseFloat(ticker.lastPrice);
                const priceChange24h = parseFloat(ticker.priceChangePercent);
                const volume24h = parseFloat(ticker.quoteVolume);
                const fundingRate = fundingMap.get(symbol) ?? 0;
                const [oiData, oiHist, klines1h, klines4h] = await Promise.all([
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$binance$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOpenInterest"])(symbol),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$binance$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOpenInterestHist"])(symbol, "1h", 5),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$binance$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getKlines"])(symbol, "1h", 50),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$binance$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getKlines"])(symbol, "4h", 50)
                ]);
                const openInterest = oiData ? parseFloat(oiData.openInterest) : 0;
                let openInterestChange = 0;
                if (oiHist.length >= 2) {
                    const latest = parseFloat(oiHist[oiHist.length - 1].sumOpenInterest);
                    const oldest = parseFloat(oiHist[0].sumOpenInterest);
                    if (oldest > 0) {
                        openInterestChange = (latest - oldest) / oldest * 100;
                    }
                }
                const rsiDivergence = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$indicators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["detectBearishDivergence"])(klines4h.length >= 30 ? klines4h : klines1h);
                const liquiditySweep = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$indicators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["detectLiquiditySweep"])(klines1h);
                const marketStructureBreak = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$indicators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["detectMarketStructureBreak"])(klines1h);
                const cvdDivergence = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$indicators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["detectCVDDivergence"])(klines1h);
                const oiSpike = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$indicators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["detectOISpike"])(oiHist);
                let rsiValue = null;
                if (klines4h.length >= 15) {
                    const closes = klines4h.map((k)=>parseFloat(k.close));
                    const rsiArr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$indicators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateRSI"])(closes, 14);
                    if (rsiArr.length > 0) {
                        rsiValue = rsiArr[rsiArr.length - 1];
                    }
                }
                const base = {
                    symbol,
                    price,
                    priceChange24h,
                    volume24h,
                    openInterest,
                    openInterestChange,
                    fundingRate,
                    rsiValue,
                    rsiDivergence,
                    liquiditySweep,
                    marketStructureBreak,
                    cvdDivergence,
                    oiSpike
                };
                const { score, signals } = scoreResult(base);
                const conviction = score >= 7 ? "HIGH" : score >= 4 ? "MEDIUM" : "LOW";
                const { entryPrice, stopLoss, takeProfit } = calcTradeLevels(price, klines1h, liquiditySweep);
                return {
                    ...base,
                    score,
                    entryPrice,
                    stopLoss,
                    takeProfit,
                    conviction,
                    signals
                };
            } catch  {
                return null;
            }
        }));
        for (const r of batchResults){
            if (r) results.push(r);
        }
    }
    return results.sort((a, b)=>b.score - a.score);
}
}),
"[project]/src/app/api/scan/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "maxDuration",
    ()=>maxDuration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$scanner$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/scanner.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/select.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
const maxDuration = 60;
async function POST() {
    try {
        const results = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$scanner$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runScan"])(100);
        if (results.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "No data from Binance API"
            }, {
                status: 503
            });
        }
        // Save scan results to DB (top 50 only)
        const top50 = results.slice(0, 50);
        // Clear old results and insert new ones
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["scanResults"]);
        if (top50.length > 0) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["scanResults"]).values(top50.map((r)=>({
                    symbol: r.symbol,
                    price: r.price,
                    priceChange24h: r.priceChange24h,
                    volume24h: r.volume24h,
                    openInterest: r.openInterest,
                    openInterestChange: r.openInterestChange,
                    fundingRate: r.fundingRate,
                    rsiValue: r.rsiValue,
                    rsiDivergence: r.rsiDivergence,
                    liquiditySweep: r.liquiditySweep,
                    marketStructureBreak: r.marketStructureBreak,
                    cvdDivergence: r.cvdDivergence,
                    oiSpike: r.oiSpike,
                    score: r.score,
                    entryPrice: r.entryPrice,
                    stopLoss: r.stopLoss,
                    takeProfit: r.takeProfit,
                    conviction: r.conviction,
                    signals: r.signals
                })));
        }
        // Save scan history
        const high = results.filter((r)=>r.conviction === "HIGH").length;
        const medium = results.filter((r)=>r.conviction === "MEDIUM").length;
        const low = results.filter((r)=>r.conviction === "LOW").length;
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["scanHistory"]).values({
            totalScanned: results.length,
            highConviction: high,
            mediumConviction: medium,
            lowConviction: low
        });
        // Create alerts for HIGH conviction signals
        const highConviction = results.filter((r)=>r.conviction === "HIGH");
        if (highConviction.length > 0) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["alerts"]).values(highConviction.map((r)=>({
                    symbol: r.symbol,
                    score: r.score,
                    conviction: r.conviction,
                    entryPrice: r.entryPrice,
                    stopLoss: r.stopLoss,
                    takeProfit: r.takeProfit,
                    signals: r.signals
                })));
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            scanned: results.length,
            highConviction: high,
            mediumConviction: medium,
            results: results.slice(0, 20)
        });
    } catch (err) {
        console.error("Scan error:", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Scan failed"
        }, {
            status: 500
        });
    }
}
async function GET() {
    try {
        const results = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["scanResults"]).orderBy((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["desc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["scanResults"].score)).limit(50);
        const history = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["scanHistory"]).orderBy((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["desc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["scanHistory"].scannedAt)).limit(1);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            results,
            lastScan: history[0] ?? null
        });
    } catch (err) {
        console.error("Get scan error:", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to fetch results"
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0iluz55._.js.map