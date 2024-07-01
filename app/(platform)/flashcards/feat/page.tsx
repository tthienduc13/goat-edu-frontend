"use client";

import dynamic from "next/dynamic";
import { notFound, useSearchParams } from "next/navigation";

const DynamicFlashcard = dynamic(
  () => import("./_components/flashcard").then((res) => res.Flashcard),
  {
    ssr: false,
  }
);

const FlashcardPage = () => {
  const params = useSearchParams();
  const type = params.get("type");
  const id = params.get("id");

  const query = ["flashcard", "theme", "done", "role", "command", "user"];

  if (!type || !query.includes(type) || !id) {
    notFound();
  }

  return (
    <div className="flex max-h-screen w-screen overflow-x-hidden">
      {type === "flashcard" && <DynamicFlashcard id={id} />}
    </div>
  );
};

export default FlashcardPage;
