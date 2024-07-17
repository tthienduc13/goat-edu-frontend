"use client";

import { useSubjectById } from "@/app/api/subject/subject.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Header } from "./_components/header";
import { SideMenu } from "./_components/sidebar/side-menu";
import { useChapterBySubject } from "@/app/api/chapter/chapter.query";
import { StudyContent } from "./_components/study-content";

interface SubjectStudyPageProps {
  params: { subjectId: string };
}

const SubjectStudyPage = ({ params }: SubjectStudyPageProps) => {
  const user = useCurrentUser();

  const queriesResult = useQueries({
    queries: [
      useSubjectById({ token: user?.token!, id: params.subjectId }),
      useChapterBySubject({ token: user?.token!, subjectId: params.subjectId }),
    ],
  });

  return (
    <div className="w-full flex min-h-[calc(100vh-80px-64px)] h-full flex-row items-start justify-between">
      <StudyContent />
      {queriesResult[1].data && (
        <SideMenu chaptersData={queriesResult[1].data} />
      )}
    </div>
  );
};

export default SubjectStudyPage;
