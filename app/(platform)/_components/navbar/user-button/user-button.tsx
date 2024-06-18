"use client";

import Link from "next/link";

import { Hint } from "@/components/custom/hint";
import { UserAvatar } from "@/components/custom/user-avatar";

import { LogoutButton } from "@/components/auth/logout-button";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bug,
  Cloud,
  CreditCard,
  Keyboard,
  LifeBuoy,
  LogOut,
  Plus,
  Settings,
  User,
  UserPlus,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ReportDialog } from "@/components/dialog/report-dialog";
import { ModeToggle } from "@/components/mode-toggle";
import { useRouter } from "next/navigation";
import { Logout } from "@/actions/logout";

export const UserButton = () => {
  const router = useRouter();
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [isOpenCommandMenu, setIsOpenCommandMenu] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const isCommand = isMac ? event.metaKey : event.ctrlKey;

      if (isCommand) {
        switch (event.key.toLowerCase()) {
          case "p":
            if (event.shiftKey) {
              event.preventDefault();
              router.push("/account/profile");
            }
            break;
          case "b":
            event.preventDefault();
            router.push("/account/billing");
            break;
          case "i":
            event.preventDefault;
            router.push("/account/invite");
            break;
          case "q":
            event.preventDefault();
            Logout();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <>
      <DropdownMenu>
        <Hint label="Profile settings" side="left" sideOffset={10}>
          <DropdownMenuTrigger asChild>
            <Button
              asChild
              variant="custom"
              className="pr-0 h-10 cursor-pointer"
            >
              <div className="flex gap-x-4 h-10">
                <div className="flex gap-x-1 items-center">
                  <Zap className="h-4 w-4" />
                  <div>Free</div>
                </div>
                <UserAvatar shape="square" />
              </div>
            </Button>
          </DropdownMenuTrigger>
        </Hint>
        <DropdownMenuContent sideOffset={10} align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="/account/profile">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            <Link href="/account/billing">
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Keyboard className="mr-2 h-4 w-4" />
              <span>Keyboard shortcuts</span>
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href={"/account/invite"}>
              <DropdownMenuItem>
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Invite</span>
                <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsReportOpen(true)}>
            <Bug className="mr-2 h-4 w-4" />
            <span>Report</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ModeToggle />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <LogoutButton>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </LogoutButton>
        </DropdownMenuContent>
      </DropdownMenu>
      <ReportDialog open={isReportOpen} setIsOpen={setIsReportOpen} />
    </>
  );
};
