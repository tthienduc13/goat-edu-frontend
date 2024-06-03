"use client";

import { Button } from "@/components/ui/button";
import { AccountNav } from "@/constants/account-nav";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
