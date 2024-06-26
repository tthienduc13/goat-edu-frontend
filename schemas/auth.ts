import * as z from "zod";

export const CheckEmailSchema = z.object({
  email: z.string().email(),
});

export const LoginSchema = z.object({
  username: z
    .string({ required_error: "Username cannot be blank" })
    .min(1, { message: "Username cannot be blank" }),
  password: z
    .string({ required_error: "Password cannot be blank" })
    .min(1, { message: "Password cannot be blank" }),
});

export const RegisterSchema = z.object({
  fullname: z.string().min(4, "Fullname needs a minimum length of 4"),
  username: z
    .string()
    .min(4, "Username needs a minimum length of 4")
    .max(10, "Username can not be exceed 10 characters")
    .regex(/^\S*$/, "Username must not contain spaces"),
  email: z.string().email("Please enter the correct format of email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password needs a minimum length of 6")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*]/,
      "Password must contain at least one special character"
    ),
  role: z.string({ required_error: "Please select your role" }),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(6, "Password needs a minimum length of 6")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*]/,
      "Password must contain at least one special character"
    ),
});
