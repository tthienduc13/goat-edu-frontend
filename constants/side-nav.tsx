import { NavItem } from "@/types/nav-item";
import {
  BookOpenCheck,
  BotMessageSquare,
  LayoutDashboard,
  LibraryBig,
} from "lucide-react";

export const NavItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/browse",
    color: "text-sky-500",
  },
  {
    title: "Discussion",
    icon: BotMessageSquare,
    href: "/discussed",
    color: "text-sky-500",
  },
  {
    title: "Flashcard",
    icon: BotMessageSquare,
    href: "/flashcards/1",
    color: "text-sky-500",
  },
  {
    title: "Courses",
    icon: LibraryBig,
    href: "/example",
    color: "text-orange-500",
    isChidren: true,
    children: [
      {
        title: "Example-01",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/example/employees",
      },
      {
        title: "Example-02",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/example/example-02",
      },
      {
        title: "Example-03",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/example/example-03",
      },
    ],
  },
];
