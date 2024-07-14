import {
  useFlashcardById,
  usePatchFlashcard,
} from "@/app/api/flashcard/flashcard.query";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useSaveStatusStore from "@/stores/useSaveStatusStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

interface EditFlashcardFormProps {
  id: string;
  token: string;
}

export const EditFlashcardForm = ({ id, token }: EditFlashcardFormProps) => {
  const queryClient = useQueryClient();
  const { setSaveStatus } = useSaveStatusStore();
  const { data, isLoading, error } = useQuery(
    useFlashcardById({ token: token, id: id })
  );

  const { mutate: patchFlashcard, isSuccess } = usePatchFlashcard({
    token: token,
    id: id,
  });

  const [flashcardName, setFlashcardName] = useState<string>("");
  const [flashcardDescription, setFlashcardDescription] = useState<string>("");

  useEffect(() => {
    if (data) {
      setFlashcardName(data.flashcardName || "");
      setFlashcardDescription(data.flashcardDescription || "");
    }
  }, [data]);

  const debounceUpdateName = useDebouncedCallback((name: string) => {
    patchFlashcard({ flashcardName: name });
    if (isSuccess) {
      setSaveStatus("Saved");
    }
  }, 500);

  const debounceUpdateDescription = useDebouncedCallback(
    (description: string) => {
      patchFlashcard({ flashcardDescription: description });
      if (isSuccess) {
        setSaveStatus("Saved");
      }
    },
    500
  );

  if (isLoading) return null;

  //TODO: Add validation + loading state

  if (error) return null;

  return (
    <div className="flex flex-col gap-y-4">
      <div className="w-full flex flex-col gap-y-5">
        <div className="rounded-xl overflow-hidden flex flex-row items-center px-4">
          <Input
            onChange={(e) => {
              const value = e.target.value;
              setFlashcardName(value);
              setSaveStatus("Unsaved");
              debounceUpdateName(value);
            }}
            value={flashcardName}
            className="flex h-16 shadow-none border-none outline-none focus-visible:ring-0 flex-col w-full text-5xl font-bold"
          />
        </div>
        <div className="w-full flex flex-row gap-x-5">
          <div className="w-full rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
            <Textarea
              onChange={(e) => {
                const value = e.target.value;
                setFlashcardDescription(value);
                setSaveStatus("Unsaved");
                debounceUpdateDescription(value);
              }}
              value={flashcardDescription}
              className="flex border-none outline-none focus-visible:ring-0 flex-col w-full text-base text-muted-foreground"
            />
          </div>
          <div className="h-12 w-full rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
            <div className="flex flex-col w-full text-muted-foreground cursor-none">
              {data?.subjectName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
