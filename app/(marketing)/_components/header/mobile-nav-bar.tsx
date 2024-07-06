import { Logo } from "@/components/custom/logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import useMobileNavStore from "@/stores/useMobileNavStore";
import Link from "next/link";

export const MobileNavbar = () => {
  const { isOpenMobileNav, setIsOpenMobileNav } = useMobileNavStore();
  return (
    <Drawer
      direction="right"
      open={isOpenMobileNav}
      onOpenChange={setIsOpenMobileNav}
    >
      <DrawerContent className="w-full">
        <DrawerHeader>
          <DrawerTitle>Welcome to goat.edu 🥳</DrawerTitle>
        </DrawerHeader>
        <div className="w-full flex flex-col gap-y-8 p-5">
          <div className="flex flex-col gap-y-4">
            <Accordion
              defaultValue="item-1"
              type="single"
              collapsible
              className="w-full"
            >
              <AccordionItem className="border-b-0" value="item-1">
                <AccordionTrigger className="text-lg p-0">
                  Getting started
                </AccordionTrigger>
                <AccordionContent>
                  <div className=" ml-2 py-5 flex flex-col gap-y-2">
                    <div className="flex flex-col">
                      <div>Introduction</div>
                      <p className="text-xs text-muted-foreground">
                        Creative learning designed platform that helps users to
                        quickly learn and remember
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <div>Student</div>
                      <p className="text-xs text-muted-foreground">
                        Learn and study through subjects, flashcards, and
                        quizzes
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <div>Teacher</div>
                      <p className="text-xs text-muted-foreground">
                        Contribute and create sets of studys for students, etc.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem className="border-b-0 mt-4" value="item-2">
                <AccordionTrigger className="text-lg p-0">
                  Features
                </AccordionTrigger>
                <AccordionContent>
                  <div className=" ml-2 py-5 flex flex-col gap-y-2">
                    <div className="flex flex-col">
                      <div>Note</div>
                      <p className="text-xs text-muted-foreground">
                        A quick note to open at all time and take note
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <div>Courses</div>
                      <p className="text-xs text-muted-foreground">
                        A database of all theory and courses for National
                        Highschool Exam
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <div>Flashcard</div>
                      <p className="text-xs text-muted-foreground">
                        Displays Quizlet-like flashcard system to enhance
                        memorization
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <div>Quiz</div>
                      <p className="text-xs text-muted-foreground">
                        Review the knowledge by taking quiz
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Link
              href={"/pricing"}
              className="text-lg font-medium cursor-pointer"
            >
              Pricing
            </Link>
          </div>
          <div className="w-full flex flex-col gap-y-2">
            <Link href={"/auth/register"}>
              <Button variant={"secondary"} className="rounded-md w-full">
                Create a new account
              </Button>
            </Link>
            <Link href={"/auth/login"}>
              <Button className="rounded-md w-full">
                Login with existed account
              </Button>
            </Link>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
