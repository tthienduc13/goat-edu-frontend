"use client";
import { Hint } from "@/components/hint";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  BookOpenCheck,
  BookOpenText,
  Check,
  ChevronDown,
  LibraryBig,
  NotebookPen,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import Image from "next/image";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import {
  FaTiktok,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { Highlight } from "@/components/ui/hero-highlight";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function Home() {
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

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

  const stickyRollContent = [
    {
      title: "Knowledge summary system",
      description:
        "Our comprehensive knowledge summary system offers a structured and organized approach to accessing information. It involves meticulous categorization based on subject matter, followed by the division of content into chapters and further subcategorization into specific topics. This hierarchical arrangement ensures that knowledge is easily navigable, allowing users to efficiently explore and grasp relevant information within a well-defined framework.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
          Collaborative Editing
        </div>
      ),
    },
    {
      title: "Post a question and participate in the discussion",
      description:
        "At Goat.edu, we foster a collaborative learning environment where you not only have the opportunity to obtain answers to your specific questions from other students, but also to actively contribute and share your own knowledge by providing answers to questions posed by fellow students and everyone has the chance to both seek and offer valuable insights.",
      content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
          <Image
            src="/linear.webp"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      ),
    },
    {
      title: "Integrated with advanced AI models",
      description:
        "Our top priority is to promptly respond to your inquiries with utmost efficiency and brevity. We recognize the value of your time and strive to provide swift, concise, and accurate answers to your questions, ensuring a seamless and satisfying experience as we address your inquiries promptly and with utmost clarity.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
          Version control
        </div>
      ),
    },
    {
      title: "Flashcards for studying help you remember quickly",
      description:
        "With Goat.edu's comprehensive multi-platform support, we empower learners to embark on their educational journey anytime and anywhere, ensuring the flexibility and convenience necessary for seamless learning across various devices and locations.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
          Running out of content
        </div>
      ),
    },
  ];

  return (
    <div className=" bg-[#0F172A] text-white">
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
        <div className="flex space-x-5">
          <Hint label="To create flashcards">
            <Link href="/auth/login">
              <Button size="icon">
                <Plus />
              </Button>
            </Link>
          </Hint>
          <div className="space-x-2">
            <Hint label="To login page">
              <Link href="/auth/login">
                <Button>Login</Button>
              </Link>
            </Hint>
            <Hint label="To register page">
              <Link href="/auth/register">
                <Button>Sign up</Button>
              </Link>
            </Hint>
          </div>
        </div>
      </div>
      <div className="body bg-transparent">
        <div className="banner w-full h-full py-[82px] px-[160px] justify-center">
          <div className="py-[100px]">
            <div className="Introduction p-12">
              <div className=" pb-12">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl w-[560px] mb-4 leading-relaxed lg:leading-snug">
                  Ghệ iu nhất hệ mặt trời,{" "}
                  <Highlight className="text-black dark:text-white">
                    Ghệ iu nhất hệ mặt trời.
                  </Highlight>
                </h1>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight w-[560px]">
                  2 lít, Okk ở quầy thu anh để lại 2 lít Thoải mái buôn dưa lê
                  chẳng phải lo khi NOKIA anh chai Hi bitch! Khi em chào anh
                </h4>
              </div>
              <Hint label="To register page">
                <Link href="/auth/register">
                  <Button className="px-[30px] py-[30px] text-base bg-[#a8b3cf14]">
                    Sign up now
                  </Button>
                </Link>
              </Hint>
            </div>
          </div>
        </div>
        <div className="ipad-scroll flex flex-col overflow-hidden">
          <ContainerScroll
            titleComponent={
              <>
                <h1 className="text-4xl font-semibold text-white dark:text-white">
                  Unleash the power of <br />
                  <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                    Scroll Animations
                  </span>
                </h1>
              </>
            }
          >
            <Image
              src={`/linear.webp`}
              alt="hero"
              height={720}
              width={1400}
              className="mx-auto rounded-2xl object-cover h-full object-left-top"
              draggable={false}
            />
          </ContainerScroll>
        </div>
        <StickyScroll content={stickyRollContent} />
      </div>
      <div className="footer flex flex-start justify-center pt-16  mb-8">
        <div className="flex flex-row w-[1220px]">
          <div className="flex flex-col w-full">
            <h4 className="scroll-m-20 text-base font-bold tracking-tight mb-5">
              About us
            </h4>
            <ul className="space-y-4 font-semibold text-base text-gray-400">
              <li>
                <a className="text-sm" href="">
                  About Goat.edu
                </a>
              </li>
              <li>
                <a className="text-sm" href="">
                  About Goat.edu
                </a>
              </li>
              <li>
                <a className="text-sm" href="">
                  About Goat.edu
                </a>
              </li>
              <li>
                <a className="text-sm" href="">
                  About Goat.edu
                </a>
              </li>
              <li>
                <a className="text-sm" href="">
                  About Goat.edu
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col w-full">
            <h4 className="scroll-m-20 text-base font-bold tracking-tight mb-5">
              About us
            </h4>
            <ul className="space-y-4 font-semibold text-base text-gray-400">
              <li>
                <a className="text-sm" href="">
                  About Goat.edu
                </a>
              </li>
              <li>
                <a className="text-sm" href="">
                  About Goat.edu
                </a>
              </li>
              <li>
                <a className="text-sm" href="">
                  About Goat.edu
                </a>
              </li>
              <li>
                <a className="text-sm" href="">
                  About Goat.edu
                </a>
              </li>
              <li>
                <a className="text-sm" href="">
                  About Goat.edu
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col w-full">
            <h4 className="scroll-m-20 text-base font-bold tracking-tight mb-5">
              About us
            </h4>
            <ul className="space-y-4 font-semibold text-base text-gray-400">
              <li>
                <a className="text-sm" href="">
                  About Goat.edu
                </a>
              </li>
              <li>
                <a className="text-sm" href="">
                  About Goat.edu
                </a>
              </li>
              <li>
                <a className="text-sm" href="">
                  About Goat.edu
                </a>
              </li>
              <li>
                <a className="text-sm" href="">
                  About Goat.edu
                </a>
              </li>
              <li>
                <a className="text-sm" href="">
                  About Goat.edu
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col w-full">
            <h4 className="scroll-m-20 text-base font-bold tracking-tight mb-5">
              About us
            </h4>
            <ul className="space-y-4 font-semibold text-base text-gray-400">
              <li>
                <a className="text-sm" href="">
                  About Goat.edu
                </a>
              </li>
              <li>
                <a className="text-sm" href="">
                  About Goat.edu
                </a>
              </li>
              <li>
                <a className="text-sm" href="">
                  About Goat.edu
                </a>
              </li>
              <li>
                <a className="text-sm" href="">
                  About Goat.edu
                </a>
              </li>
              <li>
                <a className="text-sm" href="">
                  About Goat.edu
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col w-full">
            <h4 className="scroll-m-20 text-base font-bold tracking-tight mb-5">
              About us
            </h4>
            <ul className="space-y-4 font-semibold text-base text-gray-400">
              <li>
                <a className="text-sm" href="">
                  About Goat.edu
                </a>
              </li>
              <li>
                <a className="text-sm" href="">
                  About Goat.edu
                </a>
              </li>
              <li>
                <a className="text-sm" href="">
                  About Goat.edu
                </a>
              </li>
              <li>
                <a className="text-sm" href="">
                  About Goat.edu
                </a>
              </li>
              <li>
                <a className="text-sm" href="">
                  About Goat.edu
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="bg-slate-400 block w-[1220px] h-[1px] my-2"></div>
        <div className="w-[1220px] flex flex-row py-8 justify-between">
          <div className="flex flex-col">
            <div>
              <Button size="icon" variant="ghost" className="rounded-full">
                <Link href="">
                  <FaTiktok />
                </Link>
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full">
                <Link href="">
                  <FaTwitter />
                </Link>
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full">
                <Link href="">
                  <FaFacebook />
                </Link>
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full">
                <Link href="">
                  <FaInstagram />
                </Link>
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full">
                <Link href="">
                  <FaYoutube />
                </Link>
              </Button>
            </div>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              @2024 Goat.edu, Inc.
            </p>
          </div>
          <div className="items-center flex">
            <Logo size="lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
