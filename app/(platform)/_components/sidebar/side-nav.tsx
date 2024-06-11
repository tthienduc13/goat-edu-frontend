"use client";

import { cn } from "@/lib/utils";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavItem } from "@/types/nav-item";

import { buttonVariants } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SideNavProps {
  items: NavItem[];
  setOpen?: (open: boolean) => void;
}

export const SideNav = ({ items, setOpen }: SideNavProps) => {
  const path = usePathname();

  return (
    <nav className="space-y-2 w-full flex flex-col items-center">
      {items.map((item) =>
        item.children ? (
          <Accordion
            type="single"
            collapsible
            className="space-y-2 flex flex-col w-full"
            key={item.title}
          >
            <AccordionItem value={item.title} className="border-none w-full ">
              <AccordionTrigger
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "flex w-full items-center justify-start hover:no-underline"
                )}
              >
                <div className="flex items-center w-full">
                  <item.icon className="h-5 w-5" />
                  <span className={cn("text-base duration-200 ml-2")}>
                    {item.title}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {item.children.map((children) => (
                  <Link
                    key={children.title}
                    href={children.href}
                    onClick={() => {
                      if (setOpen) setOpen(false);
                    }}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "flex ml-4 h-10 items-center justify-start w-full",
                      path === children.href && "bg-accent hover:bg-accent"
                    )}
                  >
                    <div className="flex items-center w-full">
                      <children.icon className="h-5 w-5" />
                      <span
                        className={cn(
                          "text-base duration-200 w-full ml-2 flex-1"
                        )}
                      >
                        {children.title}
                      </span>
                    </div>
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <Link
            key={item.title}
            href={item.href}
            onClick={() => {
              if (setOpen) setOpen(false);
            }}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "flex items-center w-full justify-start",
              path === item.href && "bg-accent hover:bg-accent"
            )}
          >
            <div className="flex items-center">
              <item.icon className="h-5 w-5" />
              <span className={cn("text-base duration-200 ml-2 flex-1")}>
                {item.title}
              </span>
            </div>
          </Link>
        )
      )}
    </nav>
  );
};
