"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/components/ui/navbar-menu";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Logo } from "@/components/custom/logo";
import { Hint } from "@/components/custom/hint";

import Link from "next/link";
import {
  BookOpenCheck,
  BookOpenText,
  Check,
  ChevronDown,
  LibraryBig,
  NotebookPen,
  Plus,
} from "lucide-react";
import { ModeToggle } from "../mode-toggle";

const toolSubMenu = [
  {
    title: "Student",
    list: [
      {
        icon: <LibraryBig />,
        item: "Flashcard",
      },
      {
        icon: <BookOpenText />,
        item: "Learn",
      },
      {
        icon: <NotebookPen />,
        item: "Notes",
      },
      {
        icon: <BookOpenCheck />,
        item: "Text",
      },
    ],
  },
  {
    title: "Teacher",
    list: [
      {
        icon: <LibraryBig />,
        item: "Flashcard",
      },
      {
        icon: <Check />,
        item: "Checkpoint",
      },
    ],
  },
];

const placeholders = [
  "What's the first rule of Fight Club?",
  "Who is Tyler Durden?",
  "Where is Andrew Laeddis Hiding?",
  "Write a Javascript method to reverse a string",
  "How to assemble your own PC?",
];

export const Header = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div className="h-16 z-50 bg-background fixed top-0 left-0 w-full  flex items-center px-10 ">
      <Logo size="lg" isLanding={true} />
      <Navbar />
      {/* <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      /> */}
      <div className="space-x-2">
        <Hint
          label="To login page"
          side="bottom"
          align="center"
          sideOffset={10}
        >
          <Button variant="custom" asChild>
            <Link href="/auth/login"> Login</Link>
          </Button>
        </Hint>
        <Hint
          label="To register page"
          side="bottom"
          align="center"
          sideOffset={10}
        >
          <Button variant="default" asChild>
            <Link href="/auth/register">Sign up</Link>
          </Button>
        </Hint>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="flex-1 bg-transparent">
      <Menu setActive={setActive}>
        <HoveredLink href="/">
          <MenuItem setActive={setActive} item="Home"></MenuItem>
        </HoveredLink>
        <MenuItem setActive={setActive} active={active} item="Students">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/web-dev">Web Development</HoveredLink>
            <HoveredLink href="/interface-design">Interface Design</HoveredLink>
            <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/branding">Branding</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Products">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Algochurn"
              href="https://algochurn.com"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Tailwind Master Kit"
              href="https://tailwindmasterkit.com"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Moonbeam"
              href="https://gomoonbeam.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Rogue"
              href="https://userogue.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
          </div>
        </MenuItem>
        <HoveredLink href="/pricing">
          <MenuItem item="Pricing" setActive={setActive}></MenuItem>
        </HoveredLink>
      </Menu>
    </div>
  );
};
