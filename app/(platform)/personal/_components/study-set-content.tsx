import Link from "next/link";
import Image from "next/image";

import { useQuery } from "@tanstack/react-query";
import { isToday, isYesterday } from "date-fns";

import Logo from "@/public/logo.png";

import { cn } from "@/lib/utils";
import { Flashcard } from "@/types/flashcard";

import { useCurrentUser } from "@/hooks/use-current-user";

import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronDown, Globe, LoaderCircle, PenLine } from "lucide-react";

import useCreateDialogStore from "@/stores/useCreateDialogStore";
import { useUserFlashcards } from "@/app/api/flashcard/flashcard.query";

const groupFlashcards = (flashcards: Flashcard[]) => {
  const today: Flashcard[] = [];
  const yesterday: Flashcard[] = [];
  const longTimeAgo: Flashcard[] = [];

  flashcards.forEach((flashcard: Flashcard) => {
    const updatedAt = new Date(flashcard.updatedAt);
    if (isToday(updatedAt)) {
      today.push(flashcard);
    } else if (isYesterday(updatedAt)) {
      yesterday.push(flashcard);
    } else {
      longTimeAgo.push(flashcard);
    }
  });

  return { today, yesterday, longTimeAgo };
};

export const StudySetContent = () => {
  const user = useCurrentUser();
  const { setIsOpenCreateDialog } = useCreateDialogStore();

  const { queryFn, queryKey } = useUserFlashcards({
    token: user?.token!,
    pageNumber: 1,
  });

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn,
    refetchOnMount: true,
  });

  if (isLoading) {
    return (
      <div className="h-[500px] flex flex-col justify-center items-center gap-y-10">
        <LoaderCircle className="h-10 w-10 animate-spin" />
        <div>Loading study sets</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className=" h-[500px] flex flex-col justify-center items-center gap-y-10">
        <Image src={Logo} alt="logo" width={150} height={150} />
        <Button onClick={() => setIsOpenCreateDialog(true)} size={"lg"}>
          Create your first study set
        </Button>
      </div>
    );
  }

  const { today, yesterday, longTimeAgo } = groupFlashcards(data);

  const renderFlashcards = (flashcards: Flashcard[], label: string) => (
    <>
      {flashcards.length > 0 && (
        <>
          <div className="flex flex-row items-center gap-x-5">
            <div className="text-2xl font-bold">{label}</div>
            <div className="h-[1px] bg-primary w-full "></div>
          </div>
          <div className="flex flex-col gap-y-5">
            {flashcards.map((flashcard) => (
              <div
                key={flashcard.id}
                className="relative w-full transition-all duration-300 transform hover:-translate-y-2 hover:border-b-violet-500 rounded-xl shadow-lg border-2 px-5 py-4 flex flex-col gap-y-2"
              >
                <div className="flex flex-row justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    {flashcard.numberOfFlashcardContent}{" "}
                    {flashcard.numberOfFlashcardContent > 1 ? "terms" : "term"}
                  </div>
                  <div className="flex flex-row items-center gap-x-5">
                    <Link href={`/flashcards/edit?id=${flashcard.id}`}>
                      <Button variant={"destructive"}>
                        <PenLine className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                    <div className={cn(buttonVariants({ variant: "custom" }))}>
                      <Globe className="h-4 w-4 mr-2" />
                      <div>Public</div>
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </div>
                  </div>
                </div>
                <Link
                  href={`flashcards/${flashcard.id}`}
                  className="text-lg font-semibold w-full"
                >
                  {flashcard.flashcardName}
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );

  return (
    <div className="flex flex-col gap-y-10">
      {renderFlashcards(today, "Today")}
      {renderFlashcards(yesterday, "Yesterday")}
      {renderFlashcards(longTimeAgo, "Long time ago")}
    </div>
  );
};
