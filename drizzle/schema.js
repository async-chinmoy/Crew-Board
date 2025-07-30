import {
  pgTable, serial, varchar, integer, timestamp, boolean, pgEnum, text, foreignKey
} from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['admin', 'manager', 'worker']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 255 }),
  role: roleEnum('role').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  client: varchar('client', { length: 100 }),
  status: varchar('status', { length: 50 }), 
  createdAt: timestamp('created_at').defaultNow(),
});

export const workers = pgTable('workers', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  assignedProjectId: integer('assigned_project_id').references(() => projects.id),
  rate: integer('rate'),
  joinedAt: timestamp('joined_at').defaultNow(),
});

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 200 }),
  projectId: integer('project_id').references(() => projects.id),
  assignedTo: integer('assigned_to').references(() => users.id),
  status: varchar('status', { length: 50 }),
  completedOn: timestamp('completed_on'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const attendance = pgTable('attendance', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  checkIn: timestamp('check_in'),
  checkOut: timestamp('check_out'),
  location: varchar('location', { length: 200 }),
});

export const payments = pgTable('payments', {
  id: serial('id').primaryKey(),
  workerId: integer('worker_id').references(() => users.id),
  amount: integer('amount'),
  fromDate: timestamp('from_date'),
  toDate: timestamp('to_date'),
  isApproved: boolean('is_approved').default(false),
});
