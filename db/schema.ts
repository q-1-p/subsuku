import {
  boolean,
  date,
  decimal,
  index,
  integer,
  pgTable,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  clerkId: varchar("clerk_id", { length: 32 }).notNull().unique(),
});

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    active: boolean("active").notNull().default(false),
    userId: uuid("user_id").notNull(),
    fee: decimal("fee", { precision: 10, scale: 2 }).notNull(),
    currencyId: integer("currency_id").notNull(),
    nextUpdate: date("next_update").notNull(),
    intervalCycle: integer("interval_cycle").notNull(),
    intervalUnitId: integer("interval_unit_id").notNull(),
  },
  (table) => [index("idx_subscription_id").on(table.id)],
);
