"use server";

import * as z from "zod";

import { NewDiscussionSchema } from "@/schemas/discussion";

export const CreateDiscussion = async (
  values: z.infer<typeof NewDiscussionSchema>
) => {
  const validatedFields = NewDiscussionSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { discussionName, discussionBody, discussionImage } =
    validatedFields.data;

  // const response = await register(newUserData);
  // if (response.data.status === 400 || response.data.status === 404) {
  //   return { error: response.data.message };
  // }

  // return { success: response.data.message };
};
