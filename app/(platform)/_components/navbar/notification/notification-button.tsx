"use client";

import { Hint } from "@/components/custom/hint";
import { MoreButton } from "@/components/custom/buttons/more-button";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

import { Bell } from "lucide-react";

import { NotificationList } from "./notification-list";

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
        align="end"
        alignOffset={-50}
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
