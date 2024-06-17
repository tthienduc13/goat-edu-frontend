import axiosClient from "@/lib/axiosClient";

import { LoginSchema, RegisterSchema } from "@/schemas/auth";
import https from "https";
import * as z from "zod";

type GoogleRegister = {
  name: string | null | undefined;
  email: string | null | undefined;
  roleId: string | null | undefined;
  picture: string | null | undefined;
};

const ENDPOINT = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  REGISTER_GOOGLE: "/auth/register/google",
  LOGIN_GOOGLE: "/auth/login/google",
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

export const googleRegister = async (values: GoogleRegister) => {
  const response = await axiosClient.post(ENDPOINT.REGISTER_GOOGLE, {
    name: values.name,
    email: values.email,
    roleId: values.roleId,
    picture: values.picture,
  });
  return response.data;
};

export const googleLogin = async (email: string) => {
  const response = await axiosClient.post(
    `${ENDPOINT.LOGIN_GOOGLE}?email=${email}`
  );
  return response.data;
};
