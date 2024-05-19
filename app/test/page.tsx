"use client";
import { useRoleById, useRoleByName, useRoles } from "@/api/role/use-role";
import { string } from "zod";

const TestPage = () => {
  const { data, error, isLoading } = useRoleByName("Student");
  console.log(data?.data);
  if (isLoading) return <div>is loading</div>;

  return <div>{data?.data.roleName}</div>;
};

export default TestPage;
