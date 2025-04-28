import {
  boolean,
  date,
  index,
  numeric,
  pgTable,
  real,
  smallint,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const cancellationMethodsTable = pgTable(
  "cancellation_methods",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("subscription_name", { length: 255 }).notNull(),
    public: boolean("public").notNull().default(false),
    createdUserId: uuid("created_user_id")
      .notNull()
      .references(() => usersTable.id),
    updatedAt: date("updated_at").notNull().defaultNow(),
  },
  (table) => [index("idx_cancellation_method_id").on(table.id)],
);

export const cancellationStepsTable = pgTable(
  "cancellation_steps",
  {
    cancellationMethodId: uuid("cancellation_method_id")
      .notNull()
      .references(() => cancellationMethodsTable.id),
    sequentialOrder: smallint("sequential_order").notNull(),
    procedure: varchar("procedure", { length: 255 }).notNull(),
  },
  (table) => ({primaryKey: [table.cancellationMethodId, table.sequentialOrder]})
);

export const currenciesTable = pgTable("currencies", {
  id: smallint("id").primaryKey(),
  exchangeRate: real("exchange_rate").notNull(),
});

export const subscriptionsTable = pgTable(
  "subscriptions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    active: boolean("active").notNull().default(false),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id),
    amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
    currencyId: smallint("currency_id")
      .notNull()
      .references(() => currenciesTable.id),
    nextUpdate: date("next_update").notNull(),
    intervalCycle: smallint("interval_cycle").notNull(),
    intervalId: smallint("interval_unit_id").notNull(),
    cancellationMethodId: uuid("cancellation_method_id")
      .notNull()
      .references(() => cancellationMethodsTable.id),
  },
  (table) => [index("idx_subscription_id").on(table.id)],
);

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  mailAddress: varchar("mail_address", { length: 255 }).notNull().unique(),
  clerkId: varchar("clerk_id", { length: 32 }).notNull().unique(),
});
