import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "./auth";
import * as z from "zod";
import { LoginSchema } from "@/schemas";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: z.infer<typeof LoginSchema>) =>
      await login(values),
    onMutate: () => {
      console.log("mutate");
    },

    onSuccess: (data) => {
      return { message: data.data.message, status: data.data.status };
    },

    onError: () => {
      return { message: "Something went wrong!" };
    },

    onSettled: async (_, error) => {
      console.log("settleds");
    },
  });
}
