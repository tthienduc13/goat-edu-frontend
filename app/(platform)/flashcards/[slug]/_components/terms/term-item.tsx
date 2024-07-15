import * as z from "zod";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useDeleteFlashcardContent,
  usePatchFlashcardContentById,
} from "@/app/api/flashcard-content/flashcard-content.query";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FlashcardContent } from "@/types/flashcard";
import { Loader2, PencilLine, Trash } from "lucide-react";
import { FlashcardContentItemSchema } from "@/schemas/flashcard";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useDebouncedCallback } from "use-debounce";

interface TermItemProps {
  data: FlashcardContent;
  isOwner: boolean;
  flashcardId: string;
}

export const TermItem = ({ data, isOwner, flashcardId }: TermItemProps) => {
  const user = useCurrentUser();
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const handleEditTerm = () => {
    setIsEdit(!isEdit);
  };
  const {
    mutate: deleteFlashcard,
    isPending: isDeleting,
    isSuccess: deleteSuccess,
  } = useDeleteFlashcardContent({
    token: user?.token!,
    id: flashcardId,
  });

  const form = useForm<z.infer<typeof FlashcardContentItemSchema>>({
    resolver: zodResolver(FlashcardContentItemSchema),
    defaultValues: {
      flashcardContentQuestion: data.frontHTML as string,
      flashcardContentAnswer: data.backHTML as string,
    },
  });

  const { mutate: patchFlashcardContent, isPending } =
    usePatchFlashcardContentById({
      token: user?.token!,
      flashcardId: flashcardId,
    });

  const onSubmit = (values: z.infer<typeof FlashcardContentItemSchema>) => {
    patchFlashcardContent({ id: data.id, values: values });
  };

  const debounceUpdate = useDebouncedCallback(
    (values: z.infer<typeof FlashcardContentItemSchema>) => {
      onSubmit(values);
    },
    500
  );

  // useEffect(() => {
  //   if (form.formState.isDirty) {
  //     debounceUpdate(form.getValues());
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [form.formState.isDirty, form.getValues, debounceUpdate]);
  return (
    <div className={cn("flex flex-row w-full items-center")}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-row"
        >
          <FormField
            control={form.control}
            name={"flashcardContentQuestion"}
            render={({ field }) => (
              <FormItem
                className={cn("w-[50%] px-4 flex flex-col", isEdit && "py-4")}
              >
                <FormControl>
                  <Input
                    disabled={!isEdit || isPending}
                    type="text"
                    placeholder="Enter question"
                    className="h-10 text-lg border-none shadow-none outline-none focus-visible:ring-0"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      debounceUpdate(form.getValues());
                    }}
                  />
                </FormControl>
                {isEdit && (
                  <>
                    <div className=" border-primary border-[1px]"></div>
                    <div className="text-xs font-semibold text-muted-foreground">
                      FLASHCARD QUESTION
                    </div>
                    <FormMessage />
                  </>
                )}
              </FormItem>
            )}
          />
          <Separator orientation="vertical" className="h-full" />
          <FormField
            control={form.control}
            name={"flashcardContentAnswer"}
            render={({ field }) => (
              <FormItem
                className={cn("w-[50%] px-4 flex flex-col", isEdit && "py-4")}
              >
                <FormControl>
                  <Input
                    disabled={!isEdit || isPending}
                    type="text"
                    placeholder="Enter question"
                    className="h-10 text-lg border-none shadow-none outline-none focus-visible:ring-0"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      debounceUpdate(form.getValues());
                    }}
                  />
                </FormControl>
                {isEdit && (
                  <>
                    <div className=" border-primary border-[1px]"></div>
                    <div className="text-xs font-semibold text-muted-foreground">
                      FLASHCARD ANSWER
                    </div>
                    <FormMessage />
                  </>
                )}
              </FormItem>
            )}
          />
        </form>
      </Form>
      {isOwner && (
        <div className="flex flex-row gap-x-2 pr-4">
          <Button
            disabled={isPending}
            onClick={handleEditTerm}
            variant={isEdit ? "default" : "ghost"}
            size={"icon"}
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <PencilLine className="h-5 w-5" />
            )}
          </Button>
          <Button
            onClick={() => deleteFlashcard({ id: data.id })}
            disabled={isDeleting}
            variant={"ghost"}
            size={"icon"}
          >
            {isDeleting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Trash className="h-5 w-5" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
