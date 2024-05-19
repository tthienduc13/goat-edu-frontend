import { LoginSchema, RegisterSchema } from "@/schemas";
import axiosClient from "../axios";
import * as z from "zod";

const ENDPOINT = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
};

export const login = async (values: z.infer<typeof LoginSchema>) => {
  return await axiosClient.post(ENDPOINT.LOGIN, {
    username: values.username,
    password: values.password,
  });
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  return await axiosClient.post(ENDPOINT.REGISTER, {
    userName: values.username,
    email: values.email,
    password: values.password,
    fullname: values.fullname,
    roleId: "a47c3ec7-5f22-4856-b80c-e341a7f58748",
  });
};
