import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { User, User as UserType } from "next-auth";

interface NotificationButtonProps {
  user: User;
}

export const NotificationButton = ({ user }: NotificationButtonProps) => {
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
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
