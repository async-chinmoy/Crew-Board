CREATE TYPE "public"."role" AS ENUM('admin', 'manager', 'worker');--> statement-breakpoint
CREATE TABLE "attendance" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"check_in" timestamp,
	"check_out" timestamp,
	"location" varchar(200)
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"worker_id" integer,
	"amount" integer,
	"from_date" timestamp,
	"to_date" timestamp,
	"is_approved" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"client" varchar(100),
	"status" varchar(50),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(200),
	"project_id" integer,
	"assigned_to" integer,
	"status" varchar(50),
	"completed_on" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"email" varchar(100) NOT NULL,
	"password" varchar(255),
	"role" "role" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "workers" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"assigned_project_id" integer,
	"rate" integer,
	"joined_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_worker_id_users_id_fk" FOREIGN KEY ("worker_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assigned_to_users_id_fk" FOREIGN KEY ("assigned_to") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workers" ADD CONSTRAINT "workers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workers" ADD CONSTRAINT "workers_assigned_project_id_projects_id_fk" FOREIGN KEY ("assigned_project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;