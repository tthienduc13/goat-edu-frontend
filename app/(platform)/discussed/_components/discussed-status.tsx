import { cn } from "@/lib/utils";
import { Status } from "@/types/discussion";
interface DiscussedStatusProps {
  status: string;
}
export const DiscussedStatus = ({ status }: DiscussedStatusProps) => {
  return (
    <div
      className={cn(
        "font-semibold rounded-md px-3 py-2 text-sm",
        status === Status.Approved && "text-emerald-500 bg-emerald-500/15",
        status === Status.Vac && "text-destructive bg-destructive/15",
        status === Status.Unapproved && "text-yellow-500 bg-yellow-500/15"
      )}
    >
      {status}
    </div>
  );
};
