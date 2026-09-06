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
"[project]/src/lib/signalStore.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addSignal",
    ()=>addSignal,
    "calculateStats",
    ()=>calculateStats,
    "getSignals",
    ()=>getSignals,
    "saveSignals",
    ()=>saveSignals
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
const DATA_DIR = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data');
const FILE_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(DATA_DIR, 'signals.json');
function ensureDirectoryExists() {
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(DATA_DIR)) {
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdirSync(DATA_DIR, {
            recursive: true
        });
    }
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(FILE_PATH)) {
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(FILE_PATH, JSON.stringify([]), 'utf-8');
    }
}
function getSignals() {
    ensureDirectoryExists();
    try {
        const rawData = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(FILE_PATH, 'utf-8');
        return JSON.parse(rawData);
    } catch  {
        return [];
    }
}
function saveSignals(signals) {
    ensureDirectoryExists();
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(FILE_PATH, JSON.stringify(signals, null, 2), 'utf-8');
}
function addSignal(signal) {
    const signals = getSignals();
    // Избягваме дублиране на активен сигнал за същия символ в рамките на 1 час
    const existingPending = signals.find((s)=>s.symbol === signal.symbol && s.status === 'PENDING');
    if (existingPending) return existingPending;
    const newSignal = {
        ...signal,
        id: `${signal.symbol}-${Date.now()}`,
        timestamp: Date.now(),
        status: 'PENDING'
    };
    signals.unshift(newSignal);
    saveSignals(signals);
    return newSignal;
}
function calculateStats(signals) {
    const totalClosed = signals.filter((s)=>s.status === 'WIN' || s.status === 'LOSS');
    const wins = signals.filter((s)=>s.status === 'WIN').length;
    const losses = signals.filter((s)=>s.status === 'LOSS').length;
    const pending = signals.filter((s)=>s.status === 'PENDING').length;
    const expired = signals.filter((s)=>s.status === 'EXPIRED').length;
    const totalClosedCount = totalClosed.length;
    const winRate = totalClosedCount > 0 ? wins / totalClosedCount * 100 : 0;
    const totalPnl = totalClosed.reduce((sum, s)=>sum + (s.pnlPercent || 0), 0);
    const avgPnl = totalClosedCount > 0 ? totalPnl / totalClosedCount : 0;
    return {
        totalSignals: signals.length,
        wins,
        losses,
        pending,
        expired,
        winRate: Number(winRate.toFixed(2)),
        avgPnl: Number(avgPnl.toFixed(2))
    };
}
}),
"[project]/src/app/api/signals/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$signalStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/signalStore.ts [app-route] (ecmascript)");
;
;
async function GET() {
    const signals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$signalStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSignals"])();
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$signalStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateStats"])(signals);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        stats,
        signals
    });
}
async function POST(req) {
    try {
        const body = await req.json();
        const { symbol, entryPrice, takeProfit, stopLoss, score, conviction } = body;
        if (!symbol || !entryPrice || !takeProfit || !stopLoss) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Missing required fields'
            }, {
                status: 400
            });
        }
        const newSignal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$signalStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addSignal"])({
            symbol,
            entryPrice,
            takeProfit,
            stopLoss,
            score: score || 0,
            conviction: conviction || 'MEDIUM'
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            signal: newSignal
        });
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to add signal'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0n_grlm._.js.map