import { queries } from "@/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteFlashcard,
  getAllUserFlashcard,
  getFlashcardById,
  patchFlashcard,
} from "./flashcard.api";
import { toast } from "sonner";

export const useFlashcards = (pageNumber: number, token: string) => {
  return useQuery(queries.flashcard.all(pageNumber, token));
};

export const useUserFlashcards = ({
  token,
  pageNumber,
}: {
  token: string;
  pageNumber: number;
}) => {
  const queryKey = ["flashcard", "user"];
  const queryFn = async () => {
    return getAllUserFlashcard({ token: token, pageNumber: pageNumber });
  };

  return { queryKey, queryFn };
};

export const useFlashcardById = ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  const queryKey = ["flashcard", id];
  const queryFn = async () => {
    return getFlashcardById(token, id).then((response) => response);
  };
  const enabled = !!id;

  return { queryKey, queryFn, enabled };
};

export const usePatchFlashcard = ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      flashcardName,
      flashcardDescription,
    }: {
      flashcardName?: string | null;
      flashcardDescription?: string | null;
    }) =>
      patchFlashcard({
        token: token,
        id: id,
        flashcardName: flashcardName,
        flashcardDescription: flashcardDescription,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["flashcard", id],
      });
    },
  });
};

export const useDeleteFlashcard = ({ token }: { token: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteFlashcard(token, id),
    onSuccess: (data) => {
      if (data.status === 200) {
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: ["flashcard", "user"],
        });
      } else {
        toast.error(data.message);
      }
    },
  });
};
