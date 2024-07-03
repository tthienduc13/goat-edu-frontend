import katex from "katex";
import { useEffect } from "react";

interface LatexRendererProps {
  latex: string;
}

export const LatexRenderer: React.FC<LatexRendererProps> = ({ latex }) => {
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
