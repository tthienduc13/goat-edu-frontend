import { LoginSchema, RegisterSchema } from "@/schemas";
import axiosClient from "../axios";
import https from "https";
import * as z from "zod";

const ENDPOINT = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
};

export const login = async (values: z.infer<typeof LoginSchema>) => {
  return await axiosClient.post(
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
