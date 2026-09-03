CREATE TABLE "alerts" (
	"id" serial PRIMARY KEY NOT NULL,
	"symbol" text NOT NULL,
	"score" real NOT NULL,
	"conviction" text NOT NULL,
	"entry_price" real,
	"stop_loss" real,
	"take_profit" real,
	"signals" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "scan_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"total_scanned" integer DEFAULT 0 NOT NULL,
	"high_conviction" integer DEFAULT 0 NOT NULL,
	"medium_conviction" integer DEFAULT 0 NOT NULL,
	"low_conviction" integer DEFAULT 0 NOT NULL,
	"scanned_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "scan_results" (
	"id" serial PRIMARY KEY NOT NULL,
	"symbol" text NOT NULL,
	"price" real NOT NULL,
	"price_change_24h" real DEFAULT 0 NOT NULL,
	"volume_24h" real DEFAULT 0 NOT NULL,
	"open_interest" real DEFAULT 0 NOT NULL,
	"open_interest_change" real DEFAULT 0 NOT NULL,
	"funding_rate" real DEFAULT 0 NOT NULL,
	"rsi_value" real,
	"rsi_divergence" boolean DEFAULT false NOT NULL,
	"liquidity_sweep" boolean DEFAULT false NOT NULL,
	"market_structure_break" boolean DEFAULT false NOT NULL,
	"cvd_divergence" boolean DEFAULT false NOT NULL,
	"oi_spike" boolean DEFAULT false NOT NULL,
	"score" real DEFAULT 0 NOT NULL,
	"entry_price" real,
	"stop_loss" real,
	"take_profit" real,
	"conviction" text DEFAULT 'LOW' NOT NULL,
	"signals" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"scanned_at" timestamp DEFAULT now() NOT NULL
);
