CREATE TABLE "subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"active" boolean DEFAULT false NOT NULL,
	"user_id" uuid NOT NULL,
	"fee" numeric(10, 2) NOT NULL,
	"currency_id" integer NOT NULL,
	"next_update" date NOT NULL,
	"interval_cycle" integer NOT NULL,
	"interval_unit_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"clerk_id" varchar(32) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id")
);
--> statement-breakpoint
CREATE INDEX "idx_subscription_id" ON "subscriptions" USING btree ("id");