"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { NewDiscussionSchema } from "@/schemas/discussion";
import { Button } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";

import { getImageData } from "@/lib/get-image-data";
import Editor from "@/components/novel/novel-editor";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useSubjects } from "@/app/api/subject/subject.query";
import { Check, ImageUp, LoaderCircle, Plus, Send } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/use-current-user";
import { createDiscussion } from "@/app/api/discussion/discussion.api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TagField } from "./tag-field";
import { Tag } from "@/types/tag";
import { PreventNavigation } from "@/components/custom/prevent-navigation";

type TagsInputType = {
  id: string;
  text: string;
};

export const CreateForm = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [jsonContent, setJsonContent] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const handleBrowseImage = () => {
    document.getElementById("imageImporter")?.click();
  };

  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    data: subjectData,
    isLoading,
    error,
  } = useQuery(
    useSubjects({
      token: user?.token!,
      search: searchQuery,
      sort: "",
      pageNumber: 1,
      pageSize: 100,
    })
  );

  const [preview, setPreview] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File>();

  const [tags, setTags] = useState<TagsInputType[]>([]);
  const [discussionTags, setDiscussionTags] = useState<Omit<Tag, "id">[]>([]);

  const form = useForm<z.infer<typeof NewDiscussionSchema>>({
    resolver: zodResolver(NewDiscussionSchema),
    defaultValues: {
      discussionName: "",
      discussionBody: "",
      discussionBodyHtml: "",
      discussionImage: null,
      tags: discussionTags,
      subjectId: "",
    },
  });

  const handleOnchangeimage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files, displayUrl } = getImageData(event);
    setPreview(displayUrl);
    setUploadedFile(files[0]);
  };

  const onSubmit = (values: z.infer<typeof NewDiscussionSchema>) => {
    const formData: z.infer<typeof NewDiscussionSchema> = {
      ...values,
      discussionBodyHtml: htmlContent,
      discussionBody: jsonContent,
      discussionImage: uploadedFile ?? null,
    };
    startTransition(async () => {
      const response = await createDiscussion({
        token: user?.token!,
        values: formData,
      });
      if (response.status === 200) {
        toast.success(response.message);
        queryClient.invalidateQueries({ queryKey: ["discussion", "user", 1] });
        router.replace("/personal?tab=disucussions");
      } else if (response.status === 400 || response.status === 404) {
        toast.error(response.message);
        form.reset();
      }
    });
  };
  if (error) {
    Error();
  }

  return (
    <>
      {/* <PreventNavigation
        isDirty={form.formState.isDirty}
        backHref="/browse"
        resetData={form.reset}
      /> */}
      <Form {...form}>
        <form
          className="w-full flex flex-col gap-y-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="left-0 px-5 py-4 rounded-lg border-[2px] shadow-lg w-full justify-between flex items-center">
            <div className="flex flex-col gap-y-1">
              <div className="w-full flex flex-row items-center gap-x-2">
                <Plus className="w-5 h-5" />
                <h1 className="text-xl font-semibold">Create new discussion</h1>
              </div>
              <div className="text-sm font-medium">
                Feel free to ask anything 😉
              </div>
            </div>
            <Button
              variant={"ringHover"}
              disabled={
                isPending || Object.keys(form.formState.errors).length > 0
              }
              className="w-fit rounded-xl"
              type="submit"
            >
              {isPending ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  <div>Publishing</div>
                </>
              ) : (
                <>
                  <div>Publish</div>
                  <Send className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
          <div className="w-full flex flex-col gap-y-4">
            <FormField
              control={form.control}
              name="discussionName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex flex-col w-full">
                      <Input
                        type="text"
                        placeholder={"Title here"}
                        disabled={isPending}
                        className="border-none h-full text-4xl font-bold outline-none shadow-none focus-visible:ring-0 "
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row gap-x-5 items-start">
              <FormField
                control={form.control}
                name="subjectId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="px-4">Subject</FormLabel>
                    <div className="h-12 w-full rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
                      <Popover open={isOpen} onOpenChange={setIsOpen}>
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
                                ? subjectData?.find(
                                    (subject) => subject.id === field.value
                                  )?.subjectName
                                : "Select a subject"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]">
                          <Command className="w-full">
                            <CommandInput
                              className="w-full"
                              value={searchQuery}
                              onValueChange={setSearchQuery}
                              placeholder="Search subject"
                            ></CommandInput>
                            <CommandEmpty>No Subject found</CommandEmpty>
                            <CommandList className="w-full">
                              <CommandGroup className="w-full">
                                {subjectData &&
                                  subjectData.map((subject) => (
                                    <CommandItem
                                      className="w-full"
                                      key={subject.id}
                                      value={subject.id}
                                      onSelect={() => {
                                        field.onChange(subject.id);
                                        setIsOpen(false);
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
                              </CommandGroup>
                            </CommandList>
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
                name="tags"
                render={({ field }) => (
                  <TagField
                    setDiscussionTags={setDiscussionTags}
                    tags={tags}
                    setTags={setTags}
                  />
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="discussionImage"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <div>
                      <Input
                        id="imageImporter"
                        type="file"
                        {...rest}
                        onChange={(event) => {
                          handleOnchangeimage(event);
                        }}
                        className="hidden"
                      />
                      <div
                        onClick={handleBrowseImage}
                        className="w-full overflow-hidden relative h-[400px] hover:opacity-80 cursor-pointer flex justify-center items-center border-dashed border-4 border-secondary rounded-xl bg-[#a8b3cf14]"
                      >
                        {preview ? (
                          <Image
                            src={preview}
                            alt="preview image"
                            fill
                            objectFit="cover"
                          />
                        ) : (
                          <div className="flex flex-col p-2 justify-center items-center gap-y-4">
                            <ImageUp className="h-10 w-10" />
                            <div className="text-base text-muted-foreground">
                              Upload an image
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discussionBodyHtml"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discussion Content</FormLabel>
                  <FormControl>
                    <Editor
                      setHtmlContent={(content) => {
                        setHtmlContent(content);
                        field.onChange(content);
                      }}
                      setJsonContent={setJsonContent}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </>
  );
};
