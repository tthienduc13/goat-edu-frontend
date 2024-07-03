import { useTheoryByLesson } from "@/app/api/theory/theory.query";
import React, { useEffect } from "react";
import sampleImage from "@/assets/sample2.png";
import katex from "katex";
import "katex/dist/katex.min.css";
import Image from "next/image";
import TheoryLoading from "./theory-loading";
import Empty from "../empty-state";

interface LatexRendererProps {
  latex: string;
}

interface LessonTheoryProps {
  lessonId: string;
  lessonName: string;
  token: string;
}

const LessonTheory = ({ lessonId, lessonName, token }: LessonTheoryProps) => {
  const {
    data: theoryData,
    isLoading: theoryLoading,
    error: theoryError,
  } = useTheoryByLesson(lessonId, token);

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

  if (!theoryData) {
    return <Empty />;
  }
  return (
    <div className="space-y-8 w-full">
      <h1 className="text-3xl font-semibold">{lessonName}</h1>

      <div key={theoryData?.id}>
        <LatexRenderer latex={theoryData?.theoryContent as string} />
        <div className="w-full flex justify-center">
          {theoryData?.image && (
            <Image
              src={sampleImage}
              height={400}
              width={400}
              alt="theory image"
            ></Image>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonTheory;
