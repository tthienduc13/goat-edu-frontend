"use client";
import {
  useNotificationById,
  useNotificationByUser,
} from "@/api/notification/use-notification";
import { useRoleById, useRoleByName, useRoles } from "@/api/role/use-role";
import { string } from "zod";

const TestPage = () => {
  const { data, error, isLoading } = useNotificationByUser(
    "b66c034e-b652-4779-b99c-dea2520eeea8",
    5,
    2
  );
  console.log(data?.data);
  if (isLoading) return <div>is loading</div>;

  return <div>{JSON.stringify(data?.data)}</div>;
};

export default TestPage;
