import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createNote,
  deleteNote,
  getNoteById,
  getNotesByUser,
  patchNote,
} from "./note.api";
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
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error); // Debug log for errors
      toast.error("Failed to add note.");
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
      } else {
        toast.error(data.message);
      }
    },
  });
};

export const usePatchNoteName = (token: string, id: string, userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      noteName,
      noteBody,
      noteBodyHtml,
    }: {
      noteName?: string | null;
      noteBody?: string | null;
      noteBodyHtml?: string | null;
    }) => patchNote(token, id, noteName, noteBody, noteBodyHtml),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["note", userId],
      });
    },
  });
};

export const usePatchNoteContent = (
  token: string,
  id: string,
  userId: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      noteName,
      noteBody,
      noteBodyHtml,
    }: {
      noteName?: null;
      noteBody?: string | null;
      noteBodyHtml?: string | null;
    }) => patchNote(token, id, noteName, noteBody, noteBodyHtml),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["note", "id", id],
      });
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

export const useNoteById = ({ token, id }: { token: string; id: string }) => {
  const queryKey = ["note", id];

  const queryFn = async () => {
    return getNoteById(token, id);
  };

  const enabled = !!id;

  return { queryKey, queryFn, enabled };
};
