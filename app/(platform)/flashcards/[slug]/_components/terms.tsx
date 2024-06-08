import { FlashcardContent } from "@/types/flashcard";
import { Wrapper } from "./wrapper";

interface TermsProps {
  data: FlashcardContent[];
}

const Terms = ({ data }: TermsProps) => {
  return (
    <Wrapper headerTitle={`Terms in this sets (${data.length})`}>
      <div className="flex flex-col gap-y-2">
        {data.map((data) => (
          <div
            key={data.flashcardId}
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

export default Terms;
