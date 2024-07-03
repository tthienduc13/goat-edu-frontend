"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { DragHandleDots2Icon, TrashIcon } from "@radix-ui/react-icons";
import { useFieldArray, useForm } from "react-hook-form";

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

import { FileImage, LoaderCircle, PencilLine, Plus } from "lucide-react";
import { NewFlashcardContentSchema } from "@/schemas/flashcard";
import { useEffect, useState, useTransition } from "react";
import { CreateFlashcardContent } from "@/actions/create-flashcard-content";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { FormError } from "@/components/forms/form-error";
import { useFlashcardById } from "@/app/api/flashcard/flashcard.query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/use-current-user";
import { KeyBoardShorcuts } from "./keyboard-shorcuts";
import { ImportTerms } from "./import-terms";
import { ChangeVisibility } from "./change-visibility";

export const CreateFlashcardContentForm = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isPending, startTransition] = useTransition();
  const [isOpenImage, setIsOpenImage] = useState<boolean>();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const form = useForm<z.infer<typeof NewFlashcardContentSchema>>({
    resolver: zodResolver(NewFlashcardContentSchema),
    mode: "onChange",
    defaultValues: {
      flashcardContent: [
        {
          flashcardContentQuestion: "",
          flashcardContentAnswer: "",
        },
        {
          flashcardContentQuestion: "",
          flashcardContentAnswer: "",
        },
        {
          flashcardContentQuestion: "",
          flashcardContentAnswer: "",
        },
      ],
    },
  });

  const handleOpenImage = () => {
    setIsOpenImage(!isOpenImage);
  };

  const handleInsertNew = () => {
    append({
      flashcardContentQuestion: "",
      flashcardContentAnswer: "",
    });
  };

  const onSubmit = (values: z.infer<typeof NewFlashcardContentSchema>) => {
    startTransition(() => {
      CreateFlashcardContent({ values: values, id: id! }).then((data) => {
        if (data.success) {
          toast.success(data.success);
          queryClient.invalidateQueries({
            queryKey: ["flashcard", "user"],
          });
          router.push(`${id}`);
        } else {
          toast.error(data.error);
        }
      });
    });
  };

  const { fields, append, move, remove, prepend } = useFieldArray({
    control: form.control,
    name: "flashcardContent",
  });

  const { data: flashcardData, isLoading: flashcardLoading } = useQuery(
    useFlashcardById({ token: user?.token!, id: id! })
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

  if (!id) {
    router.push("/not-found");
    return null;
  }

  if (flashcardLoading) {
    return null;
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full relative flex-col gap-10"
        >
          <div className="left-0 px-5 py-4 rounded-lg border-[2px] shadow-lg w-full justify-between flex items-center">
            <div className="flex flex-col gap-y-1">
              <div className="w-full flex flex-row items-center gap-x-2">
                <PencilLine className="w-4 h-4" />
                <div className="text-xl font-semibold">Create a new set</div>
              </div>
              <div className="text-sm text-muted-foreground">
                {fields.length} terms
              </div>
            </div>
            <Button
              disabled={
                isPending || Object.keys(form.formState.errors).length > 0
              }
              className="w-fit"
              type="submit"
            >
              {isPending ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  <div>Creating</div>
                </>
              ) : (
                <div>Create</div>
              )}
            </Button>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="w-full flex flex-col gap-y-5">
              <div className="rounded-xl overflow-hidden flex flex-row items-center px-4">
                <div className="flex flex-col w-full text-5xl font-bold cursor-none">
                  {flashcardData?.flashcardName}
                </div>
              </div>
              <div className="w-full flex flex-row gap-x-5">
                <div className="h-12  w-full rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
                  <div className="flex flex-col w-full text-base text-muted-foreground cursor-none">
                    {flashcardData?.flashcardDescription}
                  </div>
                </div>
                <div className="h-12 w-full rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
                  <div className="flex flex-col w-full text-muted-foreground cursor-none">
                    {flashcardData?.subjectName}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <ImportTerms onImport={handleImport} />
            <div className="flex flex-row items-center gap-x-2">
              <ChangeVisibility status={flashcardData?.status!} id={id} />
              <KeyBoardShorcuts />
            </div>
          </div>
          <div className="space-y-3 w-full ">
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
                            <TrashIcon className="size-5 " aria-hidden="true" />
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
                              <div className=" border-primary border-[1px]"></div>
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
                              <div className=" border-primary border-[1px]"></div>
                              <div className="text-xs font-semibold text-muted-foreground">
                                FLASHCARD ANSWER
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <button
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
                          <Button>Upgrade pro di thang lz 😏 </Button>
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
      <FormError message={form.formState.errors.flashcardContent?.message} />
    </div>
  );
};
