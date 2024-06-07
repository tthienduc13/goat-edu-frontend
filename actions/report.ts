"use server";

import { Report } from "@/app/api/report/report.api";
import { ReportSchema } from "@/schemas";
import * as z from "zod";

export const report = async (
  values: z.infer<typeof ReportSchema>,
  token: string
) => {
  const validatedFields = ReportSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { reportTitle, reportContent } = validatedFields.data;

  const response = await Report({ reportTitle, reportContent }, token);
  if (response.status === 401 || response.status === 404) {
    return { error: response.message };
  }

  return { success: response.message };
};
