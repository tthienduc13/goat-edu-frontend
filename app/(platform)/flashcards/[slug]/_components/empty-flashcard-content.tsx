import EmptyFlashcardContent from "@/public/icons/empty/empty-flashcard-content.svg";
import Image from "next/image";

export const EmtpyFlashcardContent = () => {
  return (
    <div className="w-full h-[500px] flex flex-col gap-y-5 items-center">
      <div className="w-full h-[300px] relative">
        <Image src={EmptyFlashcardContent} alt="Empty field" fill />
      </div>
      <h3>Oops...There&apos;s no content for this set</h3>
    </div>
  );
};
