"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import LessonPage from "../lesson/page";
import { useState } from "react";
import QuizDetailPage from "@/app/(game)/game/quiz/_components/quiz-detail";
import { link } from "fs";

const StudyPage = () => {
  const [display, setDisplay] = useState<boolean>(false);
  const handleOnClick = (value: boolean) => {
    setDisplay(value);
  };
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open</Button>
        </SheetTrigger>
        <SheetContent className="w-[600px]">
          <SheetHeader>
            <SheetTitle>
              Chapter 1 : Applying Derivatives to Investigate and Graph
              Functions
            </SheetTitle>
          </SheetHeader>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Lesson 1: Congruence and inverse variation of functions
              </AccordionTrigger>
              <AccordionContent>
                <Button variant={"link"} onClick={() => handleOnClick(true)}>
                  Theory
                </Button>
              </AccordionContent>
              <AccordionContent>
                <Button variant={"link"} onClick={() => handleOnClick(false)}>
                  Quiz
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SheetContent>
      </Sheet>
      {display ? <LessonPage /> : <QuizDetailPage />}
    </div>
  );
};
export default StudyPage;
