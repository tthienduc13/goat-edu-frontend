import axiosClient from "@/lib/axiosClient";
import { ReportSchema } from "@/schemas/report";

import * as z from "zod";

const END_POINT = {
  REPORT: "/report",
};

export const Report = async (
  values: z.infer<typeof ReportSchema>,
  token: string
) => {
  const response = await axiosClient.post(END_POINT.REPORT, values, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
