import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./command.module.css";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command-extended";
import { GalleryHorizontalEnd, Globe, Plus, Tablets, User } from "lucide-react";
import useCreateDialogStore from "@/stores/useCreateDialogStore";
import { cn } from "@/lib/utils";
import useCommandStore from "@/stores/useCommandStore";

export function CommandMenu() {
  const router = useRouter();

  const { setIsOpenCreateDialog } = useCreateDialogStore();
  const { isOpenCommandMenu, setIsOpenCommandMenu, toggleCommandMenu } =
    useCommandStore();
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleCommandMenu();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const commandItems = [
    {
      label: "Home",
      description: "Navigate to home",
      icon: Globe,
      onSelect: () => {
        router.push("/browse");
        setIsOpenCommandMenu(!isOpenCommandMenu);
      },
    },
    {
      label: "Profile",
      description: "Navigate to profile",
      icon: User,
      onSelect: () => {
        router.push("/account/profile");
        setIsOpenCommandMenu(!isOpenCommandMenu);
      },
    },
    {
      label: "Personal",
      description: "Navigate to personal",
      icon: Tablets,
      onSelect: () => {
        router.push("/personal");
        setIsOpenCommandMenu(!isOpenCommandMenu);
      },
    },
    {
      label: "Create study set",
      description: "Create a new study set",
      icon: GalleryHorizontalEnd,
      onSelect: () => {
        setIsOpenCreateDialog(true);
        setIsOpenCommandMenu(!isOpenCommandMenu);
      },
    },
    {
      label: "Create discussion",
      description: "Create a new discussion",
      icon: Plus,
      onSelect: () => router.push("/discussed/new"), // Add onSelect if needed
    },
  ];

  return (
    <CommandDialog open={isOpenCommandMenu} onOpenChange={setIsOpenCommandMenu}>
      <CommandInput
        className="text-base h-full"
        placeholder="Where would you like to go"
      />

      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup className={cn("py-5", styles.card)} heading="Navigation">
          {commandItems.map((item, index) => (
            <CommandItem key={index} onSelect={item.onSelect}>
              <div className="w-full flex items-center gap-x-4">
                <item.icon className="h-5 w-5" />
                <div className="flex flex-col w-full ">
                  <div className="text-base font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.description}
                  </div>
                </div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
