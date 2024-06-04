"use client";
import { Hint } from "@/components/custom/hint";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { Bell } from "lucide-react";
import { MoreButton } from "@/components/custom/buttons/more-button";
import { NotificationList } from "./notification-list";

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

export const NotificationButton = () => {
  return (
    <DropdownMenu>
      <Hint label="Notification" sideOffset={10}>
        <DropdownMenuTrigger asChild>
          <Button className="h-10 w-10" variant="custom" size="icon">
            <Bell />
          </Button>
        </DropdownMenuTrigger>
      </Hint>
      <DropdownMenuContent
        sideOffset={10}
        align="center"
        className="w-96 max-h-[300px] overflow-y-scroll"
      >
        <DropdownMenuLabel className="flex flex-row justify-between items-center">
          <p className="text-xl">Notifications</p>
          <MoreButton />
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <NotificationList />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
