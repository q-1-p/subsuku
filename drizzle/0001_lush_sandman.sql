ALTER TABLE "users" RENAME COLUMN "email" TO "mail_address";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_mail_address_unique" UNIQUE("mail_address");