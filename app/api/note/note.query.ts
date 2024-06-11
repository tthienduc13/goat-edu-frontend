import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createNote, deleteNote, getNotesByUser, patchNote } from "./note.api";
import { queries } from "@/queries";
import { Note } from "@/types/note";
import { toast } from "sonner";

export const useAddNote = (token: string, userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newNote: Omit<Note, "id" | "userId" | "createdAt">) =>
      createNote(token, newNote),
    onSuccess: (data) => {
      if (data.status === 200) {
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: ["note", userId],
        });
      }
      toast.error(data.message);
    },
  });
};

export const useDeleteNote = (token: string, id: string, userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteNote(token, id),
    onSuccess: (data) => {
      if (data.status === 200) {
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: ["note", userId],
        });
      }
      toast.error(data.message);
    },
  });
};

export const usePatchNote = (token: string, id: string, userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noteName?: string, noteBody?: string) =>
      patchNote(token, id, noteName, noteBody),
    onSuccess: (data) => {
      if (data.status === 200) {
        console.log(data.message);
        queryClient.invalidateQueries({
          queryKey: ["note", userId],
        });
      }
      console.log(data.message);
    },
  });
};

export const useNotesByUser = (token: string, userId: string) => {
  return useInfiniteQuery({
    queryKey: ["note", userId],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getNotesByUser(token, userId, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });
};

export const useNoteById = (token: string, id: string) => {
  return useQuery(queries.note.id(token, id));
};
