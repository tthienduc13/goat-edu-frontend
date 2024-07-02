import { useTheoryByLesson } from "@/app/api/theory/theory.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import React, { useEffect, useState } from "react";
import sampleImage from "@/assets/sample2.png";
import katex from "katex";
import "katex/dist/katex.min.css";
import Image from "next/image";
import TheorySection from "./theory-section";
import TheoryLoading from "./theory-loading";

interface LatexRendererProps {
  latex: string;
}

interface LessonTheoryProps {
  lessonId: string;
  lessonName: string;
}

const LessonTheory = ({ lessonId, lessonName }: LessonTheoryProps) => {
  const user = useCurrentUser();
  const {
    data: theoryData,
    isLoading: theoryLoading,
    error: theoryError,
  } = useTheoryByLesson(lessonId, user?.token as string);
  if (theoryLoading) {
    return <TheoryLoading />;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">{lessonName}</h1>
      {theoryData?.map((theory) => (
        <TheorySection key={theory.id} theory={theory} />
      ))}
    </div>
  );
};

export default LessonTheory;
