import { Lock, Globe } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Status as FlashcardStatus, Status } from "@/types/flashcard";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePatchFlashcard } from "@/app/api/flashcard/flashcard.query";

interface ChangeVisibilityProps {
  id: string;
  status: string;
}

export const ChangeVisibility = ({ id, status }: ChangeVisibilityProps) => {
  const user = useCurrentUser();
  const { mutate: patchFlashcard } = usePatchFlashcard({
    token: user?.token!,
    id: id,
  });

  const handleSelect = (status: Status) => {
    patchFlashcard({ status: status });
  };

  return (
    <div className="w-[150px]">
      <Select defaultValue={status} onValueChange={handleSelect}>
        <SelectTrigger className="h-12 rounded-xl overflow-hidden outline-none border-none focus-visible:ring-0 flex flex-row items-center bg-[#a8b3cf14] px-4">
          <SelectValue placeholder="Private or public" />
        </SelectTrigger>
        <SelectContent className="rounded-xl p-2">
          {Object.values(FlashcardStatus)
            .filter((s) => s !== FlashcardStatus.Closed)
            .map((s) => (
              <SelectItem
                key={s}
                value={s}
                className="flex flex-row items-center"
              >
                <div className="flex flex-row items-center">
                  <div>
                    {s === FlashcardStatus.Open ? (
                      <Globe className="mr-2 h-4 w-4" />
                    ) : (
                      <Lock className="mr-2 h-4 w-4" />
                    )}
                  </div>
                  <div>{s === FlashcardStatus.Open ? "Public" : "Private"}</div>
                </div>
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
};
