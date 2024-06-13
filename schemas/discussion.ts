import * as z from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 10;

export const NewDiscussionSchema = z.object({
  discussionName: z.string().nonempty({
    message: "Discussion name is required",
  }),
  discussionBody: z.string().nonempty({
    message: "Discussion content is required",
  }),
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
