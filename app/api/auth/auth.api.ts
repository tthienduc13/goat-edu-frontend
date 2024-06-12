import axiosClient from "@/lib/axiosClient";

import { LoginSchema, RegisterSchema } from "@/schemas/auth";
import https from "https";
import * as z from "zod";

const ENDPOINT = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
};

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const response = await axiosClient.post(
    ENDPOINT.LOGIN,
    {
      username: values.username,
      password: values.password,
    },
    {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    }
  );
  return response.data;
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  return await axiosClient.post(ENDPOINT.REGISTER, {
    userName: values.username,
    email: values.email,
    password: values.password,
    fullname: values.fullname,
    roleId: values.role,
  });
};
