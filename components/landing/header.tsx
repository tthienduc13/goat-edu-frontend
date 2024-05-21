import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Button } from "@/components/ui/button";

import { Logo } from "@/components/logo";
import { Hint } from "@/components/hint";

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
    <div className="header flex flex-row w-full px-10 h-16 items-center justify-between">
      <div className="flex flex-row space-x-3">
        <div>
          <Logo size="lg" />
        </div>
        <div className="right-nav-bar flex flex-row items-center space-x-5 px-2">
          <h4 className="text-sm font-medium">Home</h4>
          <div className="Study-tools">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex flex-row  space-x-3">
                <h4 className="font-medium text-sm">Study tools</h4>
                <ChevronDown size="20px" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-white p-5 mt-7 rounded-md shadow-sm"
                align="start"
              >
                {toolSubMenu.map((menu, index) => (
                  <div key={index}>
                    <DropdownMenuLabel className="font-medium text-sm text-gray-500">
                      {menu.title}
                    </DropdownMenuLabel>
                    {menu.list.map((listItem, listItemIndex) => (
                      <DropdownMenuItem
                        className="px-6 py-2 text-sm font-medium text-gray-500 flex flex-row"
                        key={listItemIndex}
                      >
                        <div className="mr-4">{listItem.icon}</div>
                        {listItem.item}
                      </DropdownMenuItem>
                    ))}
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="subject">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex flex-row space-x-3">
                <h4 className="text-sm font-medium">Subject</h4>
                <ChevronDown size="20px" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-white p-5 mt-7 rounded-md shadow-sm"
                align="start"
              >
                <DropdownMenuItem className="px-6 py-2 text-sm font-semibold text-gray-500 flex flex-row">
                  Flashcard
                </DropdownMenuItem>
                <DropdownMenuItem className="px-6 py-2 text-sm font-semibold text-gray-500 flex flex-row">
                  Learn
                </DropdownMenuItem>
                <DropdownMenuItem className="px-6 py-2 text-sm font-semibold text-gray-500 flex flex-row">
                  Notes
                </DropdownMenuItem>
                <DropdownMenuItem className="px-6 py-2 text-sm font-semibold text-gray-500 flex flex-row">
                  Test
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
      {/* <div className="flex space-x-5">
        <Hint label="To create flashcards">
          <Button size="icon" asChild>
            <Link href="/auth/login">
              <Plus />
            </Link>
          </Button>
        </Hint>
        <div className="space-x-2">
          <Hint label="To login page">
            <Button asChild>
              <Link href="/auth/login"> Login</Link>
            </Button>
          </Hint>
          <Hint label="To register page">
            <Button asChild>
              <Link href="/auth/register">Sign up</Link>
            </Button>
          </Hint>
        </div>
      </div> */}
    </div>
  );
};
