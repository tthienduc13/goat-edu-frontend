import * as z from "zod";

export const CheckEmailSchema = z.object({
  email: z.string().email(),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  fullname: z.string().min(4, "Fullname needs a minimum length of 4"),
  username: z.string().min(4, "Username needs a minimum length of 4"),
  email: z.string().email("This field is required"),
  password: z
    .string()
    .min(6, "Password needs a minimum length of 6")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});
