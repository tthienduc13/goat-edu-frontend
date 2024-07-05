"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { NewDiscussionSchema } from "@/schemas/discussion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tag, TagInput } from "emblor";

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
import { Check, ImageUp, Upload, UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/use-current-user";
import { createDiscussion } from "@/app/api/discussion/discussion.api";
import { useQueryClient } from "@tanstack/react-query";
import { TagField } from "./tag-field";

type TagsInputType = {
  id: string;
  text: string;
};

export const CreateForm = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const queryClient = useQueryClient();

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
  } = useSubjects({ search: searchQuery, pageSize: 10 });

  const [preview, setPreview] = useState("");

  const [uploadedFile, setUploadedFile] = useState<File>();

  const [tags, setTags] = useState<TagsInputType[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const form = useForm<z.infer<typeof NewDiscussionSchema>>({
    resolver: zodResolver(NewDiscussionSchema),
    mode: "onChange",
    defaultValues: {
      discussionName: "",
      discussionBody: "",
      discussionBodyHtml: "",
      discussionImage: null,
      tags: [],
      subjectId: "",
    },
  });

  const handleOnchangeimage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files, displayUrl } = getImageData(event);
    setPreview(displayUrl);
    setUploadedFile(files[0]);
  };

  const onSubmit = (values: z.infer<typeof NewDiscussionSchema>) => {
    const transformedTags = tags.map((tag) => ({ tagName: tag.text }));
    const formData: z.infer<typeof NewDiscussionSchema> = {
      ...values,
      discussionBodyHtml: htmlContent,
      discussionBody: jsonContent,
      discussionImage: uploadedFile ?? null,
      tags: transformedTags,
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col gap-y-2">
          <FormField
            control={form.control}
            name="discussionName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <div className="h-12 rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
                    <div className="flex flex-col w-full">
                      <Input
                        type="text"
                        placeholder={`What's your problem?`}
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
          <FormField
            control={form.control}
            name="discussionImage"
            render={({ field: { onChange, value, ...rest } }) => (
              <>
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
              </>
            )}
          />
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
            name="tags"
            render={({ field }) => <TagField tags={tags} setTags={setTags} />}
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
          <Button
            disabled={isPending}
            className="w-fit"
            variant="default"
            type="submit"
          >
            Publish
          </Button>
        </div>
      </form>
    </Form>
  );
};
