"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { DragHandleDots2Icon, TrashIcon } from "@radix-ui/react-icons";
import { useFieldArray, useForm } from "react-hook-form";

import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/ui/sortable";

import { FileImage, Image as ImageIcon, Plus } from "lucide-react";
import { NewFlashcardContentSchema } from "@/schemas/flashcard";

export function FlashcardArray() {
  const form = useForm<z.infer<typeof NewFlashcardContentSchema>>({
    resolver: zodResolver(NewFlashcardContentSchema),
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

  function onSubmit(values: z.infer<typeof NewFlashcardContentSchema>) {
    console.log({ values });
  }

  const { fields, append, move, remove } = useFieldArray({
    control: form.control,
    name: "flashcardContent",
  });

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
        >
          <div className="space-y-2 w-full ">
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
              <div className="w-full space-y-2">
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
                                  placeholder="Enter question"
                                  className="h-10 text-lg border-none shadow-none outline-none focus-visible:ring-0"
                                  {...field}
                                />
                              </FormControl>
                              <div className=" border-primary border-[1px]"></div>
                              <div className="text-xs font-semibold text-muted-foreground">
                                FLASHCARD QUESTION
                              </div>
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
                                FLASHCARD QUESTION
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`flashcardContent.${index}.flashcardContentAnswer`}
                          render={({ field }) => (
                            <FormItem className="  flex flex-col">
                              <FormControl>
                                <Input
                                  type="file"
                                  placeholder="Enter answer"
                                  className="h-10 hidden text-lg border-none shadow-none outline-none focus-visible:ring-0"
                                  {...field}
                                />
                              </FormControl>
                              <button className=" flex flex-col rounded-lg gap-y-1 px-6 py-3 items-center justify-center border-dashed border-[2px]">
                                <FileImage className="w-4 h-4" />
                                <div className="text-xs text-muted-foreground font-semibold">
                                  IMAGE
                                </div>
                              </button>
                            </FormItem>
                          )}
                        />
                      </div>
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
                onClick={() =>
                  append({
                    flashcardContentQuestion: "",
                    flashcardContentAnswer: "",
                  })
                }
              >
                <Plus className="h-5 w-5 mr-2 font-semibold" />
                ADD CARD
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
