import { useTheoryByLesson } from "@/app/api/theory/theory.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useQuery } from "@tanstack/react-query";
import TheoryLoading from "./theory-loading";
import Error from "@/app/error";
import Empty from "../empty-state";
import Image from "next/image";
import { LatexRenderer } from "@/lib/latext-render";
import { useEffect } from "react";

interface LessonTheoryProps {
  lessonId: string;
}

export const LessonTheory = ({ lessonId }: LessonTheoryProps) => {
  const user = useCurrentUser();

  const {
    data: theoryData,
    isLoading,
    error,
  } = useQuery(useTheoryByLesson({ token: user?.token!, lessonId: lessonId! }));

  if (isLoading) {
    return <TheoryLoading />;
  }

  if (!theoryData) {
    return <Empty />;
  }

  if (error) {
    Error();
  }
  return (
    <div className="w-full h-full flex flex-col gap-y-5">
      {theoryData.image && (
        <div className="h-[200px] w-full relative">
          <Image
            src={theoryData.image}
            alt="theory image"
            className="object-contain"
            fill
          />
        </div>
      )}
      <div className="w-full p-5 border-[2px] rounded-lg shadow-lg">
        <LatexRenderer latex={theoryData.theoryContentHtml} />
      </div>
    </div>
  );
};
