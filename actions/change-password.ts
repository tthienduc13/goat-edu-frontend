"use server";

import * as z from "zod";

import { register } from "@/app/api/auth/auth.api";
import { ChangePasswordSchema } from "@/schemas/account";
import { patchPassword } from "@/app/api/user/user.api";
import { currentUser } from "@/lib/auth";

export const ChangePassword = async (
  values: z.infer<typeof ChangePasswordSchema>
) => {
  const user = await currentUser();
  const validatedFields = ChangePasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { oldPassword, newPassword } = validatedFields.data;

  const response = await patchPassword(validatedFields.data);
  if (response.data.status === 400 || response.data.status === 404) {
    return { error: response.data.message };
  }

  return { success: response.data.message };
};
