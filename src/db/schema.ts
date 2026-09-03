import {
  pgTable,
  serial,
  text,
  real,
  integer,
  timestamp,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";

export const scanResults = pgTable("scan_results", {
  id: serial("id").primaryKey(),
  symbol: text("symbol").notNull(),
  price: real("price").notNull(),
  priceChange24h: real("price_change_24h").notNull().default(0),
  volume24h: real("volume_24h").notNull().default(0),
  openInterest: real("open_interest").notNull().default(0),
  openInterestChange: real("open_interest_change").notNull().default(0),
  fundingRate: real("funding_rate").notNull().default(0),
  rsiValue: real("rsi_value"),
  rsiDivergence: boolean("rsi_divergence").notNull().default(false),
  liquiditySweep: boolean("liquidity_sweep").notNull().default(false),
  marketStructureBreak: boolean("market_structure_break").notNull().default(false),
  cvdDivergence: boolean("cvd_divergence").notNull().default(false),
  oiSpike: boolean("oi_spike").notNull().default(false),
  score: real("score").notNull().default(0),
  entryPrice: real("entry_price"),
  stopLoss: real("stop_loss"),
  takeProfit: real("take_profit"),
  conviction: text("conviction").notNull().default("LOW"),
  signals: jsonb("signals").$type<string[]>().notNull().default([]),
  scannedAt: timestamp("scanned_at").notNull().defaultNow(),
});

export const scanHistory = pgTable("scan_history", {
  id: serial("id").primaryKey(),
  totalScanned: integer("total_scanned").notNull().default(0),
  highConviction: integer("high_conviction").notNull().default(0),
  mediumConviction: integer("medium_conviction").notNull().default(0),
  lowConviction: integer("low_conviction").notNull().default(0),
  scannedAt: timestamp("scanned_at").notNull().defaultNow(),
});

export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  symbol: text("symbol").notNull(),
  score: real("score").notNull(),
  conviction: text("conviction").notNull(),
  entryPrice: real("entry_price"),
  stopLoss: real("stop_loss"),
  takeProfit: real("take_profit"),
  signals: jsonb("signals").$type<string[]>().notNull().default([]),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
