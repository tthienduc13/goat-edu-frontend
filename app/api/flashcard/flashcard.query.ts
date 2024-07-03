import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllFlashcards,
  deleteFlashcard,
  getAllUserFlashcard,
  getFlashcardById,
  patchFlashcard,
} from "./flashcard.api";
import { toast } from "sonner";
import { Status } from "@/types/flashcard";

export const useFlashcards = ({
  token,
  sort,
  pageNumber,
  pageSize,
  status,
}: {
  token: string;
  sort: string;
  pageNumber: number;
  pageSize: number;
  status: Status;
}) => {
  const queryKey = ["flashcard", sort, pageNumber, pageSize, status];
  const queryFn = async () => {
    return getAllFlashcards({
      token: token,
      sort: sort,
      pageNumber: pageNumber,
      pageSize: pageSize,
      status: status,
    });
  };

  return { queryKey, queryFn };
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
      status,
    }: {
      flashcardName?: string | null;
      flashcardDescription?: string | null;
      status?: string | null;
    }) =>
      patchFlashcard({
        token: token,
        id: id,
        flashcardName: flashcardName,
        flashcardDescription: flashcardDescription,
        status: status,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["flashcard", id] && ["flashcard", "user"],
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
