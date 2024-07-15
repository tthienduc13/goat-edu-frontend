"use client";

import { Button } from "@/components/ui/enhanced-button";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useSubjectById } from "@/app/api/subject/subject.query";
import { SubjectDetailLoading } from "../_components/subject-detail-loading";
import { useCurrentUser } from "@/hooks/use-current-user";
import Image from "next/image";
import { ChapterList } from "../_components/chapter-list";
import { useEnrollCourse } from "@/app/api/user/user.query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Error from "@/app/error";
import { Accordion } from "@/components/ui/accordion";

interface SubjectDetailPageProps {
  params: { subjectId: string };
}

const SubjectDetailPage = ({ params }: SubjectDetailPageProps) => {
  const user = useCurrentUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [openItems, setOpenItems] = useState<string[]>([]);

  const { data, isLoading, error } = useQuery(
    useSubjectById({ token: user?.token!, id: params.subjectId })
  );

  const {
    mutate: enrollCourse,
    isSuccess,
    isPending,
  } = useEnrollCourse({
    token: user?.token!,
  });

  const handleEnrollCourse = (id: string) => {
    enrollCourse({ id: id });
    queryClient.invalidateQueries({
      queryKey: ["subject", "user", "enroll", 1, 3],
    });
    router.push(`/study/${data?.id}`);
  };

  if (isSuccess) {
    queryClient.invalidateQueries({ queryKey: ["subject", "id", data?.id] });
  }

  if (isLoading) {
    return (
      <div className="w-full h-full">
        <SubjectDetailLoading />
      </div>
    );
  }

  if (error) {
    Error();
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
                <p className="font-bold"> {data?.chapters.length} </p>
                <p> chapters </p>
              </div>
            </div>
          </div>
        )}
        {data?.chapters.map((chapter, index) => (
          <Accordion
            key={chapter.id}
            className="space-y-3"
            type="multiple"
            value={openItems}
            onValueChange={setOpenItems}
          >
            <ChapterList chapter={chapter} index={index} />
          </Accordion>
        ))}
      </div>
      <div className="subjec-img mx-3 w-[500px]">
        <div className="ml-6 flex flex-col w-full space-y-4">
          <div className="w-full h-[250px] rounded-lg overflow-hidden shadow-lg relative">
            <Image
              src={data?.image ?? ""}
              fill
              className="rounded-2xl "
              alt="Subject Image"
            ></Image>
          </div>
          <Button
            onClick={() => handleEnrollCourse(data?.id!)}
            disabled={isPending}
            variant={"gooeyLeft"}
            className="w-full rounded-xl"
          >
            {isPending && (
              <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
            )}
            {data?.isEnroll ? "Continue studying" : " Enroll"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetailPage;
