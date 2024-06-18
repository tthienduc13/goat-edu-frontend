import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { GalleryHorizontalEnd, Globe, Plus, User } from "lucide-react";

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        className="text-xl h-full"
        placeholder="Where would you like to go"
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup className="py-5">
          <CommandItem onSelect={() => router.push("/browse")}>
            <div className="w-full flex items-center gap-x-4">
              <Globe className="h-5 w-5" />
              <div className="flex flex-col w-full ">
                <div className="text-base font-medium">Home</div>
                <div className="text-xs text-muted-foreground">
                  Navigate to home
                </div>
              </div>
            </div>
          </CommandItem>
          <CommandItem>
            <div className="w-full flex items-center gap-x-4">
              <User className="h-5 w-5" />
              <div className="flex flex-col w-full ">
                <div className="text-base font-medium">Profile</div>
                <div className="text-xs text-muted-foreground">
                  Navigate to profile
                </div>
              </div>
            </div>
          </CommandItem>
          <CommandItem>
            <div className="w-full flex items-center gap-x-4">
              <GalleryHorizontalEnd className="h-5 w-5" />
              <div className="flex flex-col w-full ">
                <div className="text-base font-medium">Create study set</div>
                <div className="text-xs text-muted-foreground">
                  Create a new study set
                </div>
              </div>
            </div>
          </CommandItem>
          <CommandItem>
            <div className="w-full flex items-center gap-x-4">
              <Plus className="h-5 w-5" />
              <div className="flex flex-col w-full ">
                <div className="text-base font-medium">Create discussion</div>
                <div className="text-xs text-muted-foreground">
                  Create a new discussion
                </div>
              </div>
            </div>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
