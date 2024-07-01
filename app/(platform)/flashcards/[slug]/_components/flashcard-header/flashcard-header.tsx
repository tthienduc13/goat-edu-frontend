import { useQuery } from "@tanstack/react-query";

import { Globe, Pencil, StarIcon, Trash } from "lucide-react";
import { Flashcard } from "@/types/flashcard";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Hint } from "@/components/custom/hint";

import { useUserRate } from "@/app/api/rate/rate.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Star } from "./star-rating";
import { Skeleton } from "@/components/ui/skeleton";

interface FlashcardHeaderProps {
  id: string;
  data: Flashcard;
  termsCount: number;
}

export const FlashcardHeader = ({
  data,
  termsCount,
  id,
}: FlashcardHeaderProps) => {
  const user = useCurrentUser();
  const { data: isRated, isLoading } = useQuery(
    useUserRate({ token: user?.token!, id: id })
  );
  return (
    <div id="onborda-step1" className="flex flex-col gap-y-4 w-full">
      <h1 className="px-2 py-1 bg-secondary w-fit text-sm font-semibold rounded-xl ">
        {data.subjectName}
      </h1>
      <div className="flex flex-col gap-y-1">
        <div className="text-3xl font-bold">{data?.flashcardName}</div>
        <div id="onborda-step2" className="flex flex-row items-center gap-x-2">
          {isRated ? (
            <StarIcon className="h-5 w-5 text-[#FFB23F] fill-[#FFB23F]" />
          ) : (
            <Star id={id} />
          )}
          <div className="text-lg">{data?.star}</div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center text-muted-foreground text-sm font-medium h-5 gap-x-2">
          <div className="flex flex-row items-center gap-x-1">
            <Globe className="h-4 w-4" />
            {data?.status}
          </div>
          <Separator orientation="vertical" />
          <div>
            {termsCount} {""} {termsCount > 1 ? "terms" : "term"}
          </div>
        </div>
        {/* TODO: ADD CHECK IF USER'S FLASHCARD */}
        {data.userId === user?.userId && (
          <div className="flex flex-row items-center gap-x-2">
            <Hint label="Edit">
              <Button variant={"secondary"} size={"icon"}>
                <Pencil className="h-4 w-4" />
              </Button>
            </Hint>
            <Hint label="Delete">
              <Button variant={"secondary"} size={"icon"}>
                <Trash className="h-4 w-4" />
              </Button>
            </Hint>
          </div>
        )}
      </div>
    </div>
  );
};
