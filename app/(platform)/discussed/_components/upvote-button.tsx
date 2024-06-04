import { UpvoteIcon } from "@/components/custom-icons/upvote-icon";
import { Button } from "@/components/ui/button";

interface UpvoteButtonProps {
  voteCount: number;
}

export const UpvoteButton = ({ voteCount }: UpvoteButtonProps) => {
  return (
    <div className="flex items-center gap-x-1 flex-row">
      <Button variant="ghost" size="icon" className="hover:bg-emerald-500/70 ">
        <UpvoteIcon />
      </Button>
      <span>{voteCount}</span>
    </div>
  );
};
