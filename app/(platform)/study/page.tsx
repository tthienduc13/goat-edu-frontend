"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
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
import { useState } from "react";
import { useSubjectById } from "@/app/api/subject/subject.query";
import { useCurrentUser } from "@/hooks/use-current-user";

interface StudyPageProps {
  params: { subjectId: string };
}

const StudyPage = ({ params }: StudyPageProps) => {
  const user = useCurrentUser();
  const [display, setDisplay] = useState<boolean>(false);
  const { data, isLoading, error } = useSubjectById(
    params.subjectId,
    user?.token as string
  );
  const handleOnClick = (value: boolean) => {
    setDisplay(value);
  };
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open</Button>
        </SheetTrigger>
        {data?.chapters.map((chapter) => {
          return (
            <SheetContent key={chapter.id} className="w-[600px]">
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
                    <Button
                      variant={"link"}
                      onClick={() => handleOnClick(true)}
                    >
                      Theory
                    </Button>
                  </AccordionContent>
                  <AccordionContent>
                    <Button
                      variant={"link"}
                      onClick={() => handleOnClick(false)}
                    >
                      Quiz
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </SheetContent>
          );
        })}
      </Sheet>
    </div>
  );
};
export default StudyPage;
