import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  age: z.coerce.number().min(18, { message: "You must be at least 18 years old" }),
  role: z.enum(["admin", "manager", "worker"], {
    required_error: "Role is required",
    invalid_type_error: "Invalid role selected",
  }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["admin", "manager", "worker"], {
    required_error: "Role is required",
    invalid_type_error: "Invalid role selected",
  })
})