ALTER TABLE "currencies" ALTER COLUMN "id" SET DATA TYPE smallint;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "currency_id" SET DATA TYPE smallint;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "interval_cycle" SET DATA TYPE smallint;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "interval_unit_id" SET DATA TYPE smallint;