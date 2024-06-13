import * as z from "zod";

export const ReportSchema = z.object({
  reportTitle: z.string().min(1, "Report title must be at least one character"),
  reportContent: z
    .string()
    .min(1, "Report content must be at least one character"),
});
