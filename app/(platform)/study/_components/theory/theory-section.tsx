import Image from "next/image";
import sampleImage from "@/assets/sample2.png";
import { Theory } from "@/types/theory";
import katex from "katex";
import "katex/dist/katex.min.css";
import { useEffect } from "react";
interface TheorySectionProps {
  theory: Theory;
}

interface LatexRendererProps {
  latex: string;
}

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

const TheorySection = ({ theory }: TheorySectionProps) => {
  return (
    <div key={theory.id}>
      <h2 className="texl-3xl  font-medium"> {theory.theoryName}</h2>
      <LatexRenderer latex={theory.theoryContent} />
      <div className="w-[400px] h-[400px]">
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
  );
};

export default TheorySection;
