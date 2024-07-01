"use server";

import * as z from "zod";

import { ChangePasswordSchema } from "@/schemas/account";
import { patchPassword } from "@/app/api/user/user.api";
import { currentUser } from "@/lib/auth";
import { error } from "console";

export const ChangePassword = async (
  values: z.infer<typeof ChangePasswordSchema>
) => {
  const user = await currentUser();
  const validatedFields = ChangePasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  if (!user?.token!) {
    return { error: "Invalid user!" };
  }

  const response = await patchPassword({
    token: user?.token!,
    values: validatedFields.data,
  });

  if (response.status === 400 || response.status === 404) {
    return { error: "Error" };
  }

  return { success: response.message };
};
