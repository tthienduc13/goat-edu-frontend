import { useTheoryByLesson } from "@/app/api/theory/theory.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import React, { useEffect, useState } from "react";
import sampleImage from "@/assets/sample2.png";
import katex from "katex";
import "katex/dist/katex.min.css";
import Image from "next/image";
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

  const LatexRenderer: React.FC<LatexRendererProps> = ({ latex }) => {
    useEffect(() => {
      const elements = document.querySelectorAll("[data-latex]");
      elements.forEach((element) => {
        const latex = element.getAttribute("data-latex");
        if (latex) {
          katex.render(latex, element as HTMLElement, {
            throwOnError: false,
          });
        }
      });
    }, [latex]);

    return <div dangerouslySetInnerHTML={{ __html: latex }} />;
  };

  if (theoryLoading) {
    return <TheoryLoading />;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">{lessonName}</h1>
      {theoryData?.map((theory) => (
        <div key={theory.id}>
          <h3 className="texl-xl  font-medium"> {theory.theoryName}</h3>
          <LatexRenderer latex={theory.theoryContent} />
          <div className="w-full flex justify-center">
            {theory.image && (
              <Image
                src={sampleImage}
                height={400}
                width={400}
                alt="theory image"
              ></Image>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LessonTheory;
