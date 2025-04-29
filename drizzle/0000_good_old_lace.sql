CREATE TABLE "cancellation_methods" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"subscription_name" varchar(255) NOT NULL,
	"public" boolean DEFAULT false NOT NULL,
	"created_user_id" uuid NOT NULL,
	"updated_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cancellation_steps" (
	"cancellation_method_id" uuid NOT NULL,
	"sequential_order" smallint NOT NULL,
	"procedure" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "currencies" (
	"id" smallint PRIMARY KEY NOT NULL,
	"exchange_rate" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"active" boolean DEFAULT false NOT NULL,
	"user_id" uuid NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"currency_id" smallint NOT NULL,
	"next_update" date NOT NULL,
	"interval_cycle" smallint NOT NULL,
	"interval_unit_id" smallint NOT NULL,
	"cancellation_method_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"mail_address" varchar(255) NOT NULL,
	"clerk_id" varchar(32) NOT NULL,
	CONSTRAINT "users_mail_address_unique" UNIQUE("mail_address"),
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id")
);
--> statement-breakpoint
ALTER TABLE "cancellation_methods" ADD CONSTRAINT "cancellation_methods_created_user_id_users_id_fk" FOREIGN KEY ("created_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cancellation_steps" ADD CONSTRAINT "cancellation_steps_cancellation_method_id_cancellation_methods_id_fk" FOREIGN KEY ("cancellation_method_id") REFERENCES "public"."cancellation_methods"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_cancellation_method_id_cancellation_methods_id_fk" FOREIGN KEY ("cancellation_method_id") REFERENCES "public"."cancellation_methods"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_cancellation_method_id" ON "cancellation_methods" USING btree ("id");--> statement-breakpoint
CREATE INDEX "idx_subscription_id" ON "subscriptions" USING btree ("id");