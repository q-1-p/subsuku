import { index, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    clerkId: varchar("clerk_id", { length: 32 }).notNull().unique(),
  },
  (table) => [
    index("idx_user_email").on(table.email),
    index("idx_user_clerk_id").on(table.clerkId),
  ],
);
