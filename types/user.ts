import { Role } from "./role";

export type UserType = {
  userId: string;
  username: string;
  fullname: string;
  email: string;
  image: string;
  emailVerify: boolean;
  role: Role;
};
