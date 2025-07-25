import {
  boolean,
  date,
  index,
  numeric,
  pgTable,
  primaryKey,
  real,
  smallint,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const cancellationMethodsTable = pgTable(
  "cancellation_methods",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    subscriptionName: varchar("subscription_name", { length: 63 }).notNull(),
    isPrivate: boolean("is_private").notNull().default(false),
    precautions: text("precautions").notNull(),
    freeText: text("free_text").notNull(),
    urlToCancel: varchar("url_to_cancel", { length: 2083 }).notNull(),
    createdUserId: uuid("created_user_id")
      .notNull()
      .references(() => usersTable.id),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [index("idx_cancellation_method_id").on(table.id)],
);
export const cancellationMethodBookmarksTable = pgTable(
  "cancellation_method_bookmarks",
  {
    cancellationMethodId: uuid("cancellation_method_id")
      .notNull()
      .references(() => cancellationMethodsTable.id),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id),
  },
  (table) => [
    primaryKey({
      columns: [table.cancellationMethodId, table.userId],
    }),
  ],
);
export const cancellationMethodGoodsTable = pgTable(
  "cancellation_method_goods",
  {
    cancellationMethodId: uuid("cancellation_method_id")
      .notNull()
      .references(() => cancellationMethodsTable.id),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id),
  },
  (table) => [
    primaryKey({
      columns: [table.cancellationMethodId, table.userId],
    }),
  ],
);
export const cancellationStepsTable = pgTable(
  "cancellation_steps",
  {
    cancellationMethodId: uuid("cancellation_method_id").notNull(),
    sequentialOrder: smallint("sequential_order").notNull(),
    procedure: varchar("procedure", { length: 255 }).notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.cancellationMethodId, table.sequentialOrder],
    }),
  ],
);

export const currenciesTable = pgTable("currencies", {
  id: smallint("id").primaryKey(),
  exchangeRate: real("exchange_rate").notNull(),
});

export const subscriptionsTable = pgTable(
  "subscriptions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 63 }).notNull(),
    active: boolean("active").notNull().default(true),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id),
    amount: numeric("amount", { precision: 16, scale: 8 }).notNull(),
    currencyId: smallint("currency_id")
      .notNull()
      .references(() => currenciesTable.id),
    nextUpdate: date("next_update").notNull(),
    updateCycleNumber: smallint("update_cycle_number").notNull(),
    updateCycleUnit: smallint("update_cycle_unit").notNull(),
    linkedCancellationMethodId: uuid(
      "linked_cancellation_method_id",
    ).references(() => cancellationMethodsTable.id),
  },
  (table) => [index("idx_subscription_id").on(table.id)],
);

export const notificationTable = pgTable("notifications", {
  title: varchar("title", { length: 63 }).notNull(),
  pageUrl: varchar("page_url", { length: 2083 }),
  updatedAt: timestamp("updated_at").primaryKey().defaultNow(),
});

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  mailAddress: varchar("mail_address", { length: 255 }).notNull().unique(),
  clerkId: varchar("clerk_id", { length: 32 }).notNull().unique(),
});
