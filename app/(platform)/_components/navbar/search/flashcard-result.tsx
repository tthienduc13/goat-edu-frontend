import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Flashcard } from "@/types/flashcard";
import { UseQueryResult } from "@tanstack/react-query";
import Link from "next/link";

interface FlashcardResultProps {
  result: UseQueryResult<Flashcard[], Error>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const FlashcardResult = ({ result, setValue }: FlashcardResultProps) => {
  if (!result.data || result.data.length === 0) {
    return;
  }
  return (
    <div className="w-full flex flex-col gap-y-3">
      <div className="w-full px-4">
        <h3 className="relative text-lg w-fit ">
          Flashcards
          <div className="absolute b-0 left-0 w-[50%] h-1 bg-violet-500" />
        </h3>
      </div>
      <div className="flex flex-col gap-y-3">
        {result.data?.map((flashcard) => (
          <Link
            href={`/flashcards/${flashcard.id}`}
            onClick={() => setValue("")}
            key={flashcard.id}
            className="flex px-5 py-1 flex-col gap-y-1 hover:bg-secondary"
          >
            <div className="text-base cursor-pointer font-medium">
              {flashcard.flashcardName}
            </div>
            <div className="w-full flex flex-row gap-x-2">
              <Avatar className="h-5 w-5">
                <AvatarImage
                  src={flashcard.userImage ?? ""}
                  className="object-cover"
                ></AvatarImage>
                <AvatarFallback>GE</AvatarFallback>
              </Avatar>
              <div className="flex flex-row items-center gap-x-1 text-muted-foreground text-sm">
                <p>{flashcard.fullName}</p>
                <Separator orientation="vertical" className="h-4 " />
                <p>
                  {flashcard.numberOfFlashcardContent} {""}{" "}
                  {flashcard.numberOfFlashcardContent > 1 ? "terms" : "term"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
