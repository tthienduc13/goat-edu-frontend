import * as z from "zod";

export const NoteNameSchema = z.object({
  noteName: z.string().min(1, "Note name must be provided"),
});
