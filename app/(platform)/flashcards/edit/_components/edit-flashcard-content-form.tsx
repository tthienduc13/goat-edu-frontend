"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DragHandleDots2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/ui/sortable";
import { FileImage, Plus } from "lucide-react";
import { FlashcardContentSchema } from "@/schemas/flashcard";
import { toast } from "sonner";
import { FormError } from "@/components/forms/form-error";
import { ImportTerms } from "../../new/_components/import-terms";
import { KeyBoardShorcuts } from "../../new/_components/keyboard-shorcuts";
import useSaveStatusStore from "@/stores/useSaveStatusStore";
import { useFlashcardContentById } from "@/app/api/flashcard-content/flascard-content.query";
import { PatchFlashcardContent } from "@/actions/patch-flashcard-content";
import { useDebouncedCallback } from "use-debounce";

interface EditFlashcardContentFormProps {
  id: string;
  token: string;
}

export const EditFlashcardContentForm = ({
  id,
  token,
}: EditFlashcardContentFormProps) => {
  const queryClient = useQueryClient();
  const { setSaveStatus } = useSaveStatusStore();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { data, isLoading } = useQuery(useFlashcardContentById({ token, id }));
  const [isOpenImage, setIsOpenImage] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FlashcardContentSchema>>({
    resolver: zodResolver(FlashcardContentSchema),
    mode: "onChange",
    defaultValues: {
      flashcardContent: [],
    },
  });

  const { fields, append, move, remove, prepend } = useFieldArray({
    control: form.control,
    name: "flashcardContent",
  });

  useEffect(() => {
    if (data) {
      form.reset({
        flashcardContent: data.map((item) => ({
          flashcardContentQuestion: item.frontHTML as string,
          flashcardContentAnswer: item.backHTML as string,
        })),
      });
    }
  }, [data, form]);

  const handleOpenImage = () => {
    setIsOpenImage(!isOpenImage);
  };

  const handleInsertNew = () => {
    append({
      flashcardContentQuestion: "",
      flashcardContentAnswer: "",
    });
  };

  const onSubmit = (values: z.infer<typeof FlashcardContentSchema>) => {
    startTransition(() => {
      setSaveStatus("Unsaved");
      PatchFlashcardContent({ values, id }).then((data) => {
        if (data.success) {
          queryClient.invalidateQueries({ queryKey: ["flashcard", id] });
          router.replace(`/flashcard/${id}`);
          setSaveStatus("Saved");
        } else {
          toast.error(data.error);
        }
      });
    });
  };

  const debounceUpdate = useDebouncedCallback(
    (values: z.infer<typeof FlashcardContentSchema>) => {
      onSubmit(values);
      setSaveStatus("Saved");
    },
    500
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key === "r"
      ) {
        event.preventDefault();
        handleInsertNew();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImport = (
    flashcardContent: { question: string; answer: string }[]
  ) => {
    prepend(
      flashcardContent.map((content) => ({
        flashcardContentQuestion: content.question,
        flashcardContentAnswer: content.answer,
      }))
    );
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full relative flex-col gap-10"
        >
          <div className="flex flex-row justify-between">
            <ImportTerms onImport={handleImport} />
            <div className="flex flex-row items-center gap-x-2">
              <KeyBoardShorcuts />
            </div>
          </div>
          <div className="space-y-3 w-full">
            <Sortable
              value={fields}
              onMove={({ activeIndex, overIndex }) =>
                move(activeIndex, overIndex)
              }
              overlay={
                <div className="grid grid-cols-[0.5fr,1fr,auto,auto] items-center gap-2">
                  <Skeleton className="h-8 w-full rounded-sm" />
                  <Skeleton className="h-8 w-full rounded-sm" />
                  <Skeleton className="size-8 shrink-0 rounded-sm" />
                  <Skeleton className="size-8 shrink-0 rounded-sm" />
                </div>
              }
            >
              <div className="w-full space-y-3">
                {fields.map((field, index) => (
                  <SortableItem key={field.id} value={field.id} asChild>
                    <div className="w-full flex flex-col bg-[#a8b3cf14] rounded-xl">
                      <div className="w-full p-4 flex flex-row items-center  border-b-[2px] justify-between">
                        <div className="text-muted-foreground text-lg font-semibold flex-1">
                          {index + 1}
                        </div>
                        <div className="w-full gap-x-2 flex items-center justify-end">
                          <SortableDragHandle
                            variant="ghost"
                            size="icon"
                            className="size-8 shrink-0"
                          >
                            <DragHandleDots2Icon
                              className="size-5"
                              aria-hidden="true"
                            />
                          </SortableDragHandle>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-8 shrink-0"
                            onClick={() => remove(index)}
                          >
                            <TrashIcon className="size-5" aria-hidden="true" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                      </div>
                      <div className="w-full p-4 gap-x-8 flex flex-row">
                        <FormField
                          control={form.control}
                          name={`flashcardContent.${index}.flashcardContentQuestion`}
                          render={({ field }) => (
                            <FormItem className="w-full flex flex-col">
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Enter question"
                                  className="h-10 text-lg border-none shadow-none outline-none focus-visible:ring-0"
                                  {...field}
                                />
                              </FormControl>
                              <div className="border-primary border-[1px]"></div>
                              <div className="text-xs font-semibold text-muted-foreground">
                                FLASHCARD QUESTION
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`flashcardContent.${index}.flashcardContentAnswer`}
                          render={({ field }) => (
                            <FormItem className="w-full flex flex-col">
                              <FormControl>
                                <Input
                                  placeholder="Enter answer"
                                  className="h-10 text-lg border-none shadow-none outline-none focus-visible:ring-0"
                                  {...field}
                                />
                              </FormControl>
                              <div className="border-primary border-[1px]"></div>
                              <div className="text-xs font-semibold text-muted-foreground">
                                FLASHCARD ANSWER
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <button
                          type="button"
                          onClick={handleOpenImage}
                          className="max-h-[74px] flex flex-col rounded-lg gap-y-1 px-6 py-3 items-center justify-center border-dashed border-[2px]"
                        >
                          <FileImage className="w-4 h-4" />
                          <div className="text-xs text-muted-foreground font-semibold">
                            IMAGE
                          </div>
                        </button>
                      </div>
                      {isOpenImage && (
                        <div className="w-full border-t-[2px] py-4 flex justify-center items-center">
                          <Button>Upgrade to pro 😏</Button>
                        </div>
                      )}
                    </div>
                  </SortableItem>
                ))}
              </div>
            </Sortable>
            <div className="w-full h-[100px] rounded-lg flex items-center bg-[#a8b3cf14] justify-center">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-fit hover:bg-none border-b-[4px] p-0 rounded-none text-lg text-muted-foreground"
                onClick={handleInsertNew}
              >
                <Plus className="h-5 w-5 mr-2 font-semibold" />
                ADD CARD
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <div className="py-10">
        <FormError message={form.formState.errors.flashcardContent?.message} />
      </div>
    </div>
  );
};
