import Image from "next/image";
import EmptyComment from "@/public/icons/empty/empty-comment.svg";

export const EmptyCommentList = () => {
  return (
    <div className="w-full flex flex-col items-center gap-y-5">
      <div className="w-full h-[150px] relative">
        <Image src={EmptyComment} alt="empty comment" fill />
      </div>
      <div>Be the first person to share your thought!</div>
    </div>
  );
};
