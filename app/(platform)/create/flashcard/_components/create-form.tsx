"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { NewFlashcardSchema } from "@/schemas/flashcard";
import { useState, useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CommandEmpty } from "cmdk";
import { useSubjects } from "@/app/api/subject/subject.query";

export const CreateForm = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  // const {
  //   data: subjectData,
  //   isLoading,
  //   error,
  // } = useSubjects({ search: searchQuery, pageSize: 10 });

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewFlashcardSchema>>({
    resolver: zodResolver(NewFlashcardSchema),
    mode: "onChange",
    defaultValues: {},
  });

  const onSubmit = (values: z.infer<typeof NewFlashcardSchema>) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-y-10 "
      >
        <div className="flex flex-row w-full justify-between items-center">
          <h1 className="text-2xl">Create new flashcard set</h1>
          <Button>Create</Button>
        </div>
        <div className="flex flex-col w-full gap-y-8">
          <FormField
            control={form.control}
            name="flashcardName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="h-12 rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
                    <div className="flex flex-col w-full">
                      <Input
                        type="text"
                        placeholder={`Enter a title, like "Biology - Chapter 22: Evolution"`}
                        disabled={isPending}
                        className="border-none outline-none text-muted-foreground shadow-none focus-visible:ring-0 "
                        {...field}
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex flex-row gap-x-5 ">
            <FormField
              control={form.control}
              name="flashcardDescription"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="w-full rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
                      <div className="flex flex-col w-full">
                        <Textarea
                          placeholder="Add a description"
                          className="outline-none shadow-none focus-visible:ring-0 border-none w-full"
                          {...field}
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="subjectId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="h-12 w-full rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="ghost"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            Select a subject
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full">
                        <Command>
                          <CommandInput
                            value={searchQuery}
                            onValueChange={setSearchQuery}
                            placeholder="Search subject"
                          ></CommandInput>
                          <CommandEmpty>No Subject found</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {subjectData?.pages &&
                                subjectData.pages[0].map((subject) => (
                                  <CommandItem
                                    key={subject.id}
                                    value={subject.id}
                                    onSelect={() => {
                                      form.setValue("subjectId", subject.id);
                                    }}
                                  >
                                    {subject.subjectName}
                                  </CommandItem>
                                ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
        </div>
      </form>
    </Form>
  );
};
