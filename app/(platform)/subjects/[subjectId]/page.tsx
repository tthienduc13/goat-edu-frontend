"use client";

import sampleImage from "@/assets/sample2.png";

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
import { useCurrentUser } from "@/hooks/use-current-user";
import { useChapterBySubject } from "@/app/api/chapter/chapter.query";
import { getLessonByChapter } from "@/app/api/lesson/lesson.api";
import { Lesson, LessonByChapter } from "@/types/lesson";
import Image from "next/image";
import Link from "next/link";
import { ChapterList } from "../_components/chapter-list";

// const subject = {
//   id: "dde3365d-c247-4602-a217-54d8b9816da8",
//   subjectName: "Assetto Corsa Competitivezone",
//   image:
//     "http://res.cloudinary.com/dni30h5dy/image/upload/v1716871883/lvof1qnvpihygsrs3yyi.png",
//   subjectCode: "ACC2024",
//   information: "Assetto Corsa Competitivezone",
//   class: null,
//   createdAt: "2024-05-28T02:07:31.180258",
//   chapters: [
//     {
//       id: "b8e538e9-4380-411d-88f4-3e24cc764bb3",
//       chapterName: "Become a Sim Racer",
//       chapterLevel: 1,
//     },
//     {
//       id: "645f0558-f9d1-4788-9a83-d46ab79cf1ca",
//       chapterName: "testchangearchitech",
//       chapterLevel: 3,
//     },
//   ],
//   numberOfChapters: 2,
// };

interface SubjectDetailPageProps {
  params: { subjectId: string };
}

const SubjectDetailPage = ({ params }: SubjectDetailPageProps) => {
  const user = useCurrentUser();
  const [totalLessons, setTotalLessons] = useState<number>(0);

  const { data, isLoading, error } = useSubjectById(
    params.subjectId,
    user?.token as string
  );

  const [lessonsByChapter, setLessonsByChapter] = useState<LessonByChapter[]>(
    []
  );
  useEffect(() => {
    const fetchLessons = async () => {
      if (data?.chapters) {
        const lessonsPromises = data?.chapters.map((chapter) =>
          getLessonByChapter(chapter.id, user?.token as string, 100, 1)
        );

        const lessonsResults = await Promise.all(lessonsPromises);

        const mappedLessons = data?.chapters.map((chapter, index) => ({
          chapterid: chapter.id,
          lessonList: lessonsResults[index] || [],
          lessonCount: lessonsResults[index].length || 0,
        }));

        setLessonsByChapter(mappedLessons);

        const totalLessonsCount = mappedLessons.reduce(
          (sum, chapterLesson) => sum + chapterLesson.lessonCount,
          0
        );
        setTotalLessons(totalLessonsCount);
      }
    };

    fetchLessons();
  }, [data?.chapters, user?.token]);

  const [openItems, setOpenItems] = useState<string[]>([]);
  const allItems = data?.chapters
    ? Array.from(
        { length: data?.chapters.length },
        (_, index) => `item-${index + 1}`
      )
    : [];
  const handleOpenAll = () => {
    if (openItems.length === allItems.length) {
      setOpenItems([]);
    } else {
      setOpenItems(allItems);
    }
  };
  if (isLoading) {
    return (
      <div className="w-full h-full">
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
        {data?.numberOfChapters == 0 ? (
          "No data "
        ) : (
          <div className="flex flex-row items-center justify-between mt-4">
            <div className="flex flex-row">
              <div className="flex flex-row space-x-1">
                <p className="font-bold"> {data?.numberOfChapters} </p>
                <p> chapters </p>
              </div>
              <Dot />
              <div className="flex flex-row space-x-1">
                <p className="font-bold"> {totalLessons} </p>
                <p> lessons </p>
              </div>
            </div>
            <div>
              <Button variant="link" onClick={handleOpenAll}>
                {openItems.length === allItems.length
                  ? "Close all"
                  : "Open all"}
              </Button>
            </div>
          </div>
        )}

        <ChapterList
          data={data}
          openItems={openItems}
          setOpenItems={setOpenItems}
          lessonsByChapter={lessonsByChapter}
        />
        {/* <div className="chapter-list mt-3">
          <Accordion
            className="space-y-3"
            type="multiple"
            value={openItems}
            onValueChange={setOpenItems}
          >
            {data?.chapters.map((chapter, index) => {
              const thisChapterLesson = lessonsByChapter.find(
                (item) => item.chapterid === chapter.id
              );
              return (
                <AccordionItem key={chapter.id} value={`item-${index + 1}`}>
                  <AccordionTrigger className=" px-2">
                    <div className="flex flex-row w-full justify-between pr-4">
                      <p>
                        Chap {chapter.chapterLevel} : {chapter.chapterName}
                      </p>
                      <p> {thisChapterLesson?.lessonCount} lessons </p>
                    </div>
                  </AccordionTrigger>
                  <div>
                    {thisChapterLesson?.lessonList.map((lesson) => (
                      <AccordionContent
                        key={lesson.id}
                        className="border-b-[0.8px]  pl-6 pt-4"
                      >
                        {lesson.lessonName}
                      </AccordionContent>
                    ))}
                  </div>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div> */}
      </div>
      <div className="subjec-img mx-3 w-[500px]">
        <div className="ml-6 flex flex-col w-full space-y-4">
          <Image
            src={sampleImage}
            width="0"
            height={218}
            className="rounded-2xl object-cover w-full"
            alt="Subject Image"
          ></Image>
          {/* <img
            src={data?.image}
            width="full"
            height={218}
            className="rounded-2xl object-cover"
            alt="Subject Image"
          /> */}
          <div className="flex flex-col items-center">
            <Link href={"/study"}>
              <Button>Enroll</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetailPage;
