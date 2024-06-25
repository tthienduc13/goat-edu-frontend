import { FlashcardContent } from "@/types/flashcard";
import { Wrapper } from "./wrapper";
import { MutableRefObject } from "react";

interface TermsProps {
  data: FlashcardContent[];
}

export const Terms = ({ data }: TermsProps) => {
  return (
    <Wrapper headerTitle={` ${data.length} terms in this set`}>
      <div className="flex flex-col gap-y-2">
        {data.map((data, index) => (
          <div
            key={index}
            className="py-4 flex flex-row rouded-lg divide-x-[1px] bg-secondary/40"
          >
            <div className="w-[60%] px-4">{data.flashcardContentQuestion}</div>
            <div className="w-[40%] px-4">{data.flashcardContentAnswer}</div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};
