import { useNotificationByUser } from "@/api/notification/use-notification";
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
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { Bell, Ellipsis } from "lucide-react";
import { User as UserType } from "next-auth";
import { useState } from "react";

interface NotificationButtonProps {
  user: UserType;
}

export const NotificationButton = ({ user }: NotificationButtonProps) => {
  const [isChosenType, setIsChosenType] = useState<"All" | "Unread">("All");

  const { data, isLoading, error } = useNotificationByUser(user.id!, 10, 1);

  const onClick = (value: "All" | "Unread") => {
    setIsChosenType(value);
  };
  if (isLoading) return <div>Is Loading...</div>;
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
        <DropdownMenuGroup className="flex flex-row px-4 gap-x-4">
          <Button
            onClick={() => setIsChosenType("All")}
            // size="sm"
            variant={isChosenType == "All" ? "default" : "secondary"}
            className="rounded-3xl"
          >
            All
          </Button>
          <Button
            onClick={() => setIsChosenType("Unread")}
            size="sm"
            variant={isChosenType == "Unread" ? "default" : "secondary"}
            className="rounded-3xl"
          >
            Unread
          </Button>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          {data?.map((data) => (
            <DropdownMenuItem key={data.id}>
              {data.notificationName}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
