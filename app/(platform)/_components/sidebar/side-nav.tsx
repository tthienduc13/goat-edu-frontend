"use client";
import Link from "next/link";

import { NavItem } from "@/types/nav-item";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";
import { buttonVariants } from "@/components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Hint } from "@/components/hint";

interface SideNavProps {
  items: NavItem[];
  setOpen?: (open: boolean) => void;
  className?: string;
}

export const SideNav = ({ items, setOpen, className }: SideNavProps) => {
  const path = usePathname();
  const { isOpen } = useSidebar();
  const [openItem, setOpenItem] = useState("");
  const [lastOpenItem, setLastOpenItem] = useState("");

  useEffect(() => {
    if (isOpen) {
      setOpenItem(lastOpenItem);
    } else {
      setLastOpenItem(openItem);
      setOpenItem("");
    }
  }, [isOpen]);

  return (
    <nav className="space-y-2 flex flex-col">
      {items.map((item) =>
        item.children ? (
          <Accordion
            type="single"
            collapsible
            className="space-y-2 flex flex-col"
            key={item.title}
            value={openItem}
            onValueChange={setOpenItem}
          >
            <AccordionItem value={item.title} className="border-none ">
              <AccordionTrigger
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "flex h-12 items-center justify-start hover:no-underline"
                )}
              >
                {!isOpen ? (
                  <Hint label={item.title} side="left" sideOffset={20}>
                    <div className="flex items-center w-full">
                      <item.icon className="h-5 w-5" />
                    </div>
                  </Hint>
                ) : (
                  <div className="flex items-center w-full">
                    <item.icon className="h-5 w-5" />
                    {isOpen && (
                      <span className={cn("text-base duration-200 ml-2")}>
                        {item.title}
                      </span>
                    )}
                  </div>
                )}
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
                      "flex ml-4 h-12 items-center justify-start",
                      path === children.href && "bg-muted hover:bg-muted"
                    )}
                  >
                    {!isOpen ? (
                      <Hint label={item.title} side="left" sideOffset={20}>
                        <div className="flex items-center">
                          <children.icon className="h-5 w-5" />
                        </div>
                      </Hint>
                    ) : (
                      <div className="flex items-center">
                        <children.icon className="h-5 w-5" />
                        {isOpen && (
                          <span
                            className={cn("text-base duration-200 ml-2 flex-1")}
                          >
                            {children.title}
                          </span>
                        )}
                      </div>
                    )}
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
              "flex h-12 items-center justify-start",
              path === item.href && "bg-muted hover:bg-muted"
            )}
          >
            {!isOpen ? (
              <Hint label={item.title} side="left" sideOffset={20}>
                <div className="flex items-center">
                  <item.icon className="h-5 w-5" />
                </div>
              </Hint>
            ) : (
              <div className="flex items-center">
                <item.icon className="h-5 w-5" />
                {isOpen && (
                  <span className={cn("text-base duration-200 ml-2 flex-1")}>
                    {item.title}
                  </span>
                )}
              </div>
            )}
          </Link>
        )
      )}
    </nav>
  );
};
