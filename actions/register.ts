"use server";

import * as z from "zod";

import { RegisterSchema } from "@/schemas";
import { register } from "@/api/auth";

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, username, fullname } = validatedFields.data;

  const newUserData = { email, password, username, fullname };

  const response = await register(newUserData);
  console.log(response);
  if (response.data.status === 400 || response.data.status === 404) {
    return { error: response.data.message };
  }

  return { success: response.data.message };
};
