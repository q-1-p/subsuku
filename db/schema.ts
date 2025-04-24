import {
  boolean,
  date,
  index,
  numeric,
  pgTable,
  real,
  smallint,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  mailAddress: varchar("mail_address", { length: 255 }).notNull().unique(),
  clerkId: varchar("clerk_id", { length: 32 }).notNull().unique(),
});

export const subscriptionsTable = pgTable(
  "subscriptions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    active: boolean("active").notNull().default(false),
    userId: uuid("user_id").notNull(),
    amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
    currencyId: smallint("currency_id").notNull(),
    nextUpdate: date("next_update").notNull(),
    intervalCycle: smallint("interval_cycle").notNull(),
    intervalId: smallint("interval_unit_id").notNull(),
    cancellationMethod: text("cancellation_method").notNull(),
  },
  (table) => [index("idx_subscription_id").on(table.id)],
);

export const currenciesTable = pgTable("currencies", {
  id: smallint("id").primaryKey(),
  exchangeRate: real("exchange_rate").notNull(),
});
