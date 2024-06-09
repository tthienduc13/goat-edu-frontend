"use client";

import { Button } from "@/components/ui/button";
import { Dot } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { useSubjectById } from "@/app/api/subject/subject.query";
import { SubjectDetailLoading } from "../_components/subject-detail-loading";
import { useParams } from "next/navigation";

const subject = {
  id: "dde3365d-c247-4602-a217-54d8b9816da8",
  subjectName: "Assetto Corsa Competitivezone",
  image:
    "http://res.cloudinary.com/dni30h5dy/image/upload/v1716871883/lvof1qnvpihygsrs3yyi.png",
  subjectCode: "ACC2024",
  information: "Assetto Corsa Competitivezone",
  class: null,
  createdAt: "2024-05-28T02:07:31.180258",
  chapters: [
    {
      id: "b8e538e9-4380-411d-88f4-3e24cc764bb3",
      chapterName: "Become a Sim Racer",
      chapterLevel: 1,
    },
    {
      id: "645f0558-f9d1-4788-9a83-d46ab79cf1ca",
      chapterName: "testchangearchitech",
      chapterLevel: 3,
    },
  ],
  numberOfChapters: 2,
};

const SubjectDetailPage = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluIiwiVXNlcklkIjoiMDgzYTIyZDAtYjJiMC00MjUwLTkzYjQtZjk0OGMzMWY1NWQxIiwiUm9sZUlkIjoiMTkwNTk4ZmUtZGYzMS00ZWEyLWFiZTMtYWI5MDUwYmUwNjllIiwicm9sZSI6IkFkbWluIiwiRnVsbG5hbWUiOiJhZG1pbiBwcm8iLCJuYmYiOjE3MTc2MDM2NzQsImV4cCI6MTcxODIwODQ3NCwiaWF0IjoxNzE3NjAzNjc0LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAifQ.wyIZQpNJ4MBblLMzLyt88Tsj_fOfJGMHADRZ8M0c6pY";
  const { slug } = useParams();
  const { data, isLoading, error } = useSubjectById(slug as string, token);
  const [openItems, setOpenItems] = useState<string[]>([]);
  const allItems = ["item-1", "item-2", "item-3"];
  const handleOpenAll = () => {
    if (openItems.length === allItems.length) {
      setOpenItems([]);
    } else {
      setOpenItems(allItems);
    }
  };
  if (isLoading) {
    return (
      <div className="w-[1000px] h-full">
        <SubjectDetailLoading />
      </div>
    );
  }

  if (error) {
  }
  return (
    <div className="flex flex-row w-full">
      <div className="subjec-information w-full">
        <h2 className="scroll-m-20 mb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {data?.subjectName!}
        </h2>
        <p className="w-h-full">{data?.information}</p>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row">
            <div className="flex flex-row space-x-1">
              <p className="font-bold"> {data?.numberOfChapters} </p>
              <p> chapters </p>
            </div>
            <Dot />
            <div className="flex flex-row space-x-1">
              <p className="font-bold"> 9 </p>
              <p> lessons </p>
            </div>
          </div>
          <div>
            <Button variant="link" onClick={handleOpenAll}>
              {openItems.length === allItems.length ? "Close all" : "Open all"}
            </Button>
          </div>
        </div>
        <div className="chapter-list mt-3">
          <Accordion
            className="space-y-3"
            type="multiple"
            value={openItems}
            onValueChange={setOpenItems}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className=" px-2">
                <div className="flex flex-row w-full justify-between pr-4">
                  <p>chap 1</p>
                  <p> 3 lessons </p>
                </div>
              </AccordionTrigger>
              <div>
                <AccordionContent className="border-b-[0.8px]  pl-6 pt-4">
                  lesson 1
                </AccordionContent>
                <AccordionContent className="border-b-[0.8px] pl-6 pt-4">
                  lesson 2
                </AccordionContent>
                <AccordionContent className=" pl-6 pt-4">
                  lesson 3
                </AccordionContent>
              </div>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className=" px-2">
                <div className="flex flex-row w-full justify-between pr-4">
                  <p>chap 2</p>
                  <p> 3 lessons </p>
                </div>
              </AccordionTrigger>
              <div>
                <AccordionContent className="border-b-[0.8px] pl-6 pt-4">
                  lesson 1
                </AccordionContent>
                <AccordionContent className="border-b-[0.8px] pl-6 pt-4">
                  lesson 2
                </AccordionContent>
                <AccordionContent className="border-b-[0.8px] pl-6 pt-4">
                  lesson 3
                </AccordionContent>
              </div>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className=" px-2">
                <div className="flex flex-row w-full justify-between pr-4">
                  <p>chap 3</p>
                  <p> 3 lessons </p>
                </div>
              </AccordionTrigger>
              <div>
                <AccordionContent className="border-b-[0.8px] pl-6 pt-4">
                  lesson 1
                </AccordionContent>
                <AccordionContent className="border-b-[0.8px] pl-6 pt-4">
                  lesson 2
                </AccordionContent>
                <AccordionContent className="border-b-[0.8px] pl-6 pt-4">
                  lesson 3
                </AccordionContent>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="subjec-img mx-3">
        <div className="ml-6 flex flex-col">
          <img
            src={data?.image}
            width={386}
            height={218}
            className="rounded-2xl object-cover"
            alt="Subject Image"
          />
          <div className="flex flex-col items-center">
            <Button className="mt-4" size="lg">
              Enroll
            </Button>
            <div className="flex flex-col space-y-[10px] pt-6">
              <p> information 1 </p>
              <p> information 2 </p>
              <p> information 3 </p>
              <p> information 4 </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetailPage;
