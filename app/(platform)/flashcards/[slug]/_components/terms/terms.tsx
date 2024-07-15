import { FlashcardContent } from "@/types/flashcard";
import { Layers } from "lucide-react";
import { TermItem } from "./term-item";

interface TermsProps {
  data?: FlashcardContent[];
  termsCount?: number;
  isOwner: boolean;
  flashcardId: string;
}

export const Terms = ({
  data,
  termsCount,
  isOwner,
  flashcardId,
}: TermsProps) => {
  if (!data || !termsCount) {
    return null;
  }

  console.log(data);
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-row items-center gap-x-2">
        <div className="flex flex-row items-center gap-x-1">
          <Layers className="-rotate-90 w-8 h-8 font-semibold " />
          <div className="font-bold text-3xl">{termsCount}</div>
        </div>
        <div className="text-xl font-semibold">
          {termsCount > 1 ? "terms" : "term"} in this set
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-2">
        {data.map((item) => (
          <div
            key={item.id}
            className="py-4 rounded-xl shadow-md flex flex-row rouded-lg divide-x-[1px] bg-secondary/40"
          >
            <TermItem data={item} isOwner={isOwner} flashcardId={flashcardId} />
          </div>
        ))}
      </div>
    </div>
  );
};
