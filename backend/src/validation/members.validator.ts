import { z } from 'zod';

// Email Schema
export const emailSchema = z
  .email({ message: "Please enter a valid email address" })
  .trim()
  .nonempty({ message: "Email is required" });

// Password Schema
export const passwordSchema = z
  .string()
  .trim()
  .nonempty({ message: "Password is required" })
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(64, { message: "Password cannot exceed 64 characters" })
  .regex(/[A-Z]/, {
    message: "Password must include at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must include at least one lowercase letter",
  })
  .regex(/\d/, { message: "Password must include at least one number" })
  .regex(/[^A-Za-z0-9]/, {
    message: "Password must include at least one special character",
  });

// Name Schema
export const nameSchema = z
  .string()
  .trim()
  .min(2, { message: "Name must be at least 2 characters long" })
  .max(50, { message: "Name cannot exceed 50 characters" });

// Create User Schema (Signup)
export const CreateUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema.nonempty({ message: "Name is required" }),
  provider: z.enum(['credentials', 'google', 'github']),
  passoutYear: z.number().optional()
});

export const SigninSchema = z.object({
  email: emailSchema,
  password: passwordSchema
});

export const UpdateSchema = z.object({
  memberData : z.object({
    name: nameSchema.optional(),
    phone: z.string().trim().optional(),
    bio: z.string().trim().optional(),
    github: z.url().trim().optional(),
    linkedin: z.url().trim().optional(),
    twitter: z.url().trim().optional(),
    geeksforgeeks: z.url().trim().optional(),
    leetcode: z.url().trim().optional(),
    codechef: z.url().trim().optional(),
    codeforces: z.url().trim().optional(),
    passoutYear:z.union([z.string(), z.date()]).optional(),
    birth_date:z.union([z.string(), z.date()]).optional()
  })
})

export const resetPasswordSchema = z.object({  
    password: passwordSchema
})  

export const forgotPasswordSchema = z.object({
    email: emailSchema
})