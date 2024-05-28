"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ChevronRight, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AccountNav = [
  {
    title: "Profile",
    href: "/account/profile",
    symbol: (
      <Avatar className="rounded-full  overflow-hidden h-6 w-6">
        <AvatarImage
        // src={user?.image!}
        />
        <AvatarFallback className="w-full text-sm h-full flex items-center justify-center bg-gradient-to-r from-[#fc538d]  to-[#ce3df3]">
          GE
        </AvatarFallback>
      </Avatar>
    ),
  },
  {
    title: "Invite",
    href: "/account/invite",
    symbol: <Users className="h-6 w-6" />,
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="w-[300px] ml-[150px] flex flex-col gap-y-2 p-6 ">
      {AccountNav.map((item) => (
        <Button
          key={item.title}
          variant={pathname === item.href ? "custom" : "ghost"}
          className="p-6 rounded-2xl justify-start"
        >
          <Link className="w-full" href={item.href}>
            <div className=" flex flex-row justify-between">
              <div className="flex flex-row gap-x-2 items-center">
                {item.symbol}
                <p className="ml-2">{item.title}</p>
              </div>
              <ChevronRight />
            </div>
          </Link>
        </Button>
      ))}
    </div>
  );
};
