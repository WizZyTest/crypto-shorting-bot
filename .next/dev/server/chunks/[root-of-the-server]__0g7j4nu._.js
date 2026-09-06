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
"[project]/src/lib/winrateTracker.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "evaluatePendingSignals",
    ()=>evaluatePendingSignals
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$signalStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/signalStore.ts [app-route] (ecmascript)");
;
async function evaluatePendingSignals() {
    const signals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$signalStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSignals"])();
    const pendingSignals = signals.filter((s)=>s.status === 'PENDING');
    if (pendingSignals.length === 0) return {
        updated: 0
    };
    let updatedCount = 0;
    const maxHoursPending = 24; // Сигналът изтича след 24ч без ударен TP/SL
    for (const signal of pendingSignals){
        try {
            // Дърпаме High/Low свещите от момента на сигнала до сега от Binance
            const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=${signal.symbol}&interval=15m&startTime=${signal.timestamp}`);
            if (!res.ok) continue;
            const klines = await res.json();
            let hitWin = false;
            let hitLoss = false;
            let closedPrice = signal.entryPrice;
            for (const kline of klines){
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
                signal.pnlPercent = Number(((signal.entryPrice - closedPrice) / signal.entryPrice * 100).toFixed(2));
                updatedCount++;
            } else if (hitLoss) {
                signal.status = 'LOSS';
                signal.closedPrice = closedPrice;
                signal.closedAt = Date.now();
                signal.pnlPercent = Number(((signal.entryPrice - closedPrice) / signal.entryPrice * 100).toFixed(2));
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$signalStore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["saveSignals"])(signals);
    }
    return {
        updated: updatedCount
    };
}
}),
"[project]/src/app/api/signals/evaluate/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$winrateTracker$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/winrateTracker.ts [app-route] (ecmascript)");
;
;
async function POST() {
    try {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$winrateTracker$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["evaluatePendingSignals"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            ...result
        });
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Evaluation failed'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0g7j4nu._.js.map