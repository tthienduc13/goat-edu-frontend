import { useNotificationByUser } from "@/app/api/notification/notification.query";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { notifications } from "@/queries/notification";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { Bell, Ellipsis, Link } from "lucide-react";
import { User as UserType } from "next-auth";
import { useState } from "react";
import { EmptyNotification } from "./empty-notification";
import { Notification } from "@/types/notification";

interface NotificationButtonProps {
  user: UserType;
}

// const data = [
//   {
//     id: "1",
//     notificationName: "New Achievement",
//     notificationMessage:
//       "Congratuation ! you have reached the final stage of Math",
//     userId: "user1",
//     createAt: new Date("2023-05-02T14:20:00Z"),
//     readAt: new Date("2023-05-02T14:45:00Z"),
//   },
//   {
//     id: "1",
//     notificationName: "New Achievement",
//     notificationMessage:
//       "Congratuation ! you have reached the final stage of Math",
//     userId: "user1",
//     createAt: new Date("2023-06-15T08:10:00Z"),
//     readAt: new Date("2023-06-15T08:35:00Z"),
//   },
//   {
//     id: "1",
//     notificationName: "New Achievement",
//     notificationMessage:
//       "Congratuation ! you have reached the final stage of Math",
//     userId: "user1",
//     createAt: new Date("2023-07-21T17:00:00Z"),
//     readAt: new Date("2023-07-21T17:25:00Z"),
//   },
//   {
//     id: "1",
//     notificationName: "New Achievement",
//     notificationMessage:
//       "Congratuation ! you have reached the final stage of Math",
//     userId: "user1",
//     createAt: new Date("2023-08-05T11:55:00Z"),
//     readAt: new Date("2023-08-05T12:20:00Z"),
//   },
//   {
//     id: "1",
//     notificationName: "New Achievement",
//     notificationMessage:
//       "Congratuation ! you have reached the final stage of Math",
//     userId: "user1",
//     createAt: new Date("2023-09-30T09:15:00Z"),
//     readAt: new Date("2023-09-30T09:40:00Z"),
//   },
// ];

const data: Notification[] = [];
export const NotificationButton = () =>
  // { user }: NotificationButtonProps
  {
    // const { data, isLoading, error } = useNotificationByUser(user.id!, 10, 1);

    // if (isLoading) return <div>Is Loading...</div>;

    // if (!data.length) {
    //   return;
    // }

    // return <EmptyNotification />;
    return (
      <DropdownMenu>
        <Hint label="Notification" sideOffset={10}>
          <DropdownMenuTrigger asChild>
            <Button className="h-10 w-10" variant="custom" size="icon">
              <Bell />
            </Button>
          </DropdownMenuTrigger>
        </Hint>
        <DropdownMenuContent sideOffset={10} align="center" className="w-96">
          <DropdownMenuLabel className="flex flex-row justify-between items-center">
            <p className="text-xl">Notifications</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="rounded-full h-7 w-7"
                  size="icon"
                  variant="ghost"
                >
                  <Ellipsis className="w-5" />
                </Button>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            {data.length ? (
              data?.map((data) => (
                <DropdownMenuItem
                  className="h-25 flex flex-col items-start space-y-1"
                  key={data.id}
                >
                  <p className="notification-title text-base font-semibold tracking-tight">
                    {data.notificationName}
                  </p>
                  <p className="notification-message">
                    {data.notificationMessage}
                  </p>
                  <p className="text-xs">{data.createAt.toLocaleString()}</p>
                </DropdownMenuItem>
              ))
            ) : (
              <EmptyNotification />
            )}
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            {data.length ? (
              <Button className="w-full mt-2" variant="ghost">
                Show more
              </Button>
            ) : (
              ""
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
