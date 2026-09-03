import TelegramBot from "node-telegram-bot-api";
import { ScanResult } from "./scanner";

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

let bot: TelegramBot | null = null;

if (token) {
  bot = new TelegramBot(token, { polling: false });
}

function fmtPrice(n: number | null): string {
  if (n === null) return "N/A";
  if (n >= 10000) return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (n >= 100) return n.toFixed(2);
  if (n >= 1) return n.toFixed(3);
  return n.toFixed(5);
}

export async function sendTelegramAlert(result: ScanResult) {
  if (!bot || !chatId) {
    console.warn("Telegram bot token or chat ID is missing.");
    return;
  }

  const signalsList = result.signals.map((s) => `• ${s}`).join("\n");
  const tradingViewUrl = `https://www.tradingview.com/chart/?symbol=BINANCE:${result.symbol}.P`;

  const message = `
🚨 <b>HIGH CONVICTION SHORT SIGNAL</b> 🚨

<b>Asset:</b> #${result.symbol}
<b>Score:</b> <code>${result.score} / 10</code> 🔥
<b>Current Price:</b> <code>$${fmtPrice(result.price)}</code>

🎯 <b>TRADE LEVELS (ATR Based)</b>
├ <b>Entry:</b> <code>$${fmtPrice(result.entryPrice)}</code>
├ <b>Stop Loss:</b> <code>$${fmtPrice(result.stopLoss)}</code>
└ <b>Take Profit:</b> <code>$${fmtPrice(result.takeProfit)}</code>

📊 <b>KEY SIGNALS</b>
${signalsList}

📈 <a href="${tradingViewUrl}">Open TradingView Chart</a>
`;

  try {
    await bot.sendMessage(chatId, message, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  } catch (err) {
    console.error("Failed to send Telegram alert:", err);
  }
}
