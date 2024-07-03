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
  FormLabel,
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
  CommandEmpty,
} from "@/components/ui/command";
import { useSubjects } from "@/app/api/subject/subject.query";
import { Check, LoaderCircle, Lock, Globe } from "lucide-react";
import { CreateFlashcard } from "@/actions/create-flashcard";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useCreateDialogStore from "@/stores/useCreateDialogStore";
import { useQueryClient } from "@tanstack/react-query";
import { Status } from "@/types/flashcard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CreateFlashcardForm = () => {
  const { setIsOpenCreateDialog } = useCreateDialogStore();
  const queryClient = useQueryClient();

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const {
    data: subjectData,
    isLoading,
    error,
  } = useSubjects({ search: searchQuery, pageSize: 10 });

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewFlashcardSchema>>({
    resolver: zodResolver(NewFlashcardSchema),
    mode: "onChange",
    defaultValues: {
      flashcardName: "",
      flashcardDescription: "",
      subjectId: "",
      status: Status.Open,
    },
  });

  const onSubmit = (values: z.infer<typeof NewFlashcardSchema>) => {
    startTransition(() => {
      CreateFlashcard(values).then((data) => {
        if (data.success) {
          toast.success(data.success);
          queryClient.invalidateQueries({
            queryKey: ["flashcard", "user"],
          });
          router.push(`/flashcards/new?id=${data.data}`);
          setIsOpenCreateDialog(false);
        }
        if (data.error) toast.error(data.error);
      });
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full py-6  ">
        <div className="flex flex-col w-full gap-y-5">
          <FormField
            control={form.control}
            name="flashcardName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="px-4">Name</FormLabel>
                <FormControl>
                  <div className="h-12 rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
                    <div className="flex flex-col w-full">
                      <Input
                        type="text"
                        placeholder={`Enter a title, like "Biology - Chapter 22: Evolution"`}
                        disabled={isPending}
                        className="border-none outline-none text-base shadow-none focus-visible:ring-0 "
                        {...field}
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row items-center gap-x-2">
            <FormField
              control={form.control}
              name="subjectId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="px-4">Subject</FormLabel>
                  <div className="h-12 w-full rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl className="w-full">
                          <Button
                            variant="ghost"
                            role="combobox"
                            className={cn(
                              " justify-between hover:bg-none w-full",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? subjectData?.pages[0].find(
                                  (subject) => subject.id === field.value
                                )?.subjectName
                              : "Select a subject"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full hover:bg-none">
                        <Command className="w-full">
                          <CommandInput
                            className="w-full"
                            value={searchQuery}
                            onValueChange={setSearchQuery}
                            placeholder="Search subject"
                          ></CommandInput>
                          <CommandEmpty>No Subject found</CommandEmpty>
                          <CommandGroup className="w-full">
                            <CommandList className="w-full">
                              {subjectData?.pages &&
                                subjectData.pages[0].map((subject) => (
                                  <CommandItem
                                    className="w-full"
                                    key={subject.id}
                                    value={subject.id}
                                    onSelect={() => {
                                      form.setValue("subjectId", subject.id);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        subject.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
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
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full gap-y-2">
                  <FormLabel className="px-4">Privacy</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 rounded-xl overflow-hidden outline-none border-none focus-visible:ring-0 flex flex-row items-center bg-[#a8b3cf14] px-4">
                        <SelectValue placeholder="Are you a student or teacher" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-xl p-2">
                      {Object.values(Status)
                        .filter((status) => status !== Status.Closed)
                        .map((status) => (
                          <SelectItem
                            key={status}
                            value={status}
                            className="flex flex-row items-center"
                          >
                            <div className="flex flex-row items-center">
                              <div>
                                {status === Status.Open ? (
                                  <Globe className="mr-2 h-4 w-4" />
                                ) : (
                                  <Lock className="mr-2 h-4 w-4" />
                                )}
                              </div>
                              <div>
                                {status === Status.Open ? "Public" : "Private"}
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="flashcardDescription"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="px-4">Description</FormLabel>
                <FormControl>
                  <div className="w-full rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
                    <div className="flex flex-col w-full">
                      <Textarea
                        placeholder="Add a description"
                        className="outline-none text-base shadow-none focus-visible:ring-0 border-none w-full"
                        {...field}
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} size={"lg"} type="submit">
            {isPending && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};
