"use client";
import {
  useNotificationById,
  useNotificationByUser,
} from "@/api/notification/use-notification";
import { useRoleById, useRoleByName, useRoles } from "@/api/role/use-role";
import { string } from "zod";

const TestPage = () => {
  const { data, error, isLoading } = useRoleById(
    "a47c3ec7-5f22-4856-b80c-e341a7f58748"
  );
  console.log(data);
  if (isLoading) return <div>is loading</div>;

  return <div>{JSON.stringify(data)}</div>;
};

export default TestPage;
