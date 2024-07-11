import * as z from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 10;

export const NewDiscussionSchema = z.object({
  discussionName: z.string().nonempty({
    message: "Discussion name is required",
  }),
  discussionBody: z.string(),
  discussionBodyHtml: z.string().nonempty({
    message: "Discussion content is required",
  }),
  discussionImage: z
    .any()
    .refine((file) => file?.length == 1, "Photo is required.")
    .refine(
      (file) => file[0]?.size <= MAX_UPLOAD_SIZE,
      "Max file size is 10MB."
    )
    .nullable(),
  tags: z
    .array(
      z.object({
        tagName: z.string({ required_error: "Tag name must be provided" }),
      })
    )
    .length(4, "Exactly 4 tags must be provided"),
  subjectId: z
    .string({ required_error: "Please choose related subject" })
    .nonempty("Please choose a related subject"),
});
