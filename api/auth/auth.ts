import { LoginSchema } from "@/schemas";
import axiosClient from "../axios";
import * as z from "zod";

const ENDPOINT = {
  LOGIN: "/auth/login",
};

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const response = await axiosClient.post(ENDPOINT.LOGIN, {
    username: values.username,
    password: values.password,
  });

  return response;
};
