"use server";

import * as z from "zod";

import { RegisterSchema } from "@/schemas";
import { register } from "@/app/api/auth/auth.api";

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, username, fullname, role } = validatedFields.data;

  const newUserData = { email, password, username, fullname, role };

  const response = await register(newUserData);
  if (response.data.status === 400 || response.data.status === 404) {
    return { error: response.data.message };
  }

  return { success: response.data.message };
};
