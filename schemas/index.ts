import * as z from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 10;
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const CheckEmailSchema = z.object({
  email: z.string().email(),
});

export const LoginSchema = z.object({
  username: z.string().nonempty({
    message: "Username or email must be provided",
  }),
  password: z.string().nonempty({
    message: "Password cannot be blank",
  }),
});

export const RegisterSchema = z.object({
  fullname: z.string().min(4, "Fullname needs a minimum length of 4"),
  username: z.string().min(4, "Username needs a minimum length of 4"),
  email: z.string().email("This field is required"),
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

export const NewFlashcardSchema = z.object({
  flashcardName: z.string({ required_error: "Title is required" }),
  flashcardDescription: z.string({ required_error: "Description is required" }),
  subject: z.string({ required_error: "Please choose related subject" }),
});

export const NewDiscussionSchema = z.object({
  discussionName: z.string({ required_error: "Title must be provided" }),
  // discussionBody: z.string().nonempty({
  //   message: "Content must be provided",
  // }),
  discussionImage: z
    .any()
    .refine((file) => file?.length == 1, "Photo is required.")
    .refine(
      (file) => file[0]?.size <= MAX_UPLOAD_SIZE,
      "Max file size is 10MB."
    ),
  // tags: z
  //   .array(
  //     z.object({
  //       id: z.string(),
  //       name: z.string().nonempty({
  //         message: "Tag name must be provided",
  //       }),
  //     })
  //   )
  //   .min(1, "At least one tag must be provided"),
});
