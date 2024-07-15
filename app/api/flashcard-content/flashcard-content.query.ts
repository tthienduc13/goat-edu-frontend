import * as z from "zod";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FlashcardContentResponse,
  deleteFlashcardContent,
  getAllFlashcardContentById,
  patchFlashcardContent,
  patchFlashcardContentById,
} from "./flashcard-content.api";
import { toast } from "sonner";
import { FlashcardContentItemSchema } from "@/schemas/flashcard";

export const useFlashcardContentById = ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  const queryKey = ["flashcardContent", id];

  const queryFn = async () => {
    return getAllFlashcardContentById(token, id).then((response) => response);
  };
  const enabled = !!id;
  return { queryKey, queryFn, enabled };
};

export const useDeleteFlashcardContent = ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      deleteFlashcardContent({ token: token, id: id }),
    onSuccess: (data) => {
      if (data.status === 200) {
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: ["flashcardContent", id],
        });
      } else {
        toast.error(data.message);
      }
    },
  });
};

export const usePatchFlashcardContentById = ({
  token,
  flashcardId,
}: {
  token: string;
  flashcardId: string;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: z.infer<typeof FlashcardContentItemSchema>;
    }) => patchFlashcardContentById({ token: token, id: id, values: values }),
    onSuccess: (data) => {
      if (data.status === 200) {
        queryClient.invalidateQueries({
          queryKey: ["flashcardContent", flashcardId],
        });
      } else {
        toast.error(data.message);
      }
    },
  });
};

export const usePatchFlashcardContent = ({
  token,
  flashcardId,
}: {
  token: string;
  flashcardId: string;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ values }: { values: FlashcardContentResponse[] }) =>
      patchFlashcardContent({ token: token, id: flashcardId, values: values }),
    onSuccess: (data) => {
      if (data.status === 200) {
        queryClient.invalidateQueries({
          queryKey: ["flashcardContent", flashcardId],
        });
      } else {
        toast.error(data.message);
      }
    },
  });
};
