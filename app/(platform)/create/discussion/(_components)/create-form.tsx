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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getImageData } from "@/lib/get-image-data";
import Editor from "@/components/novel/novel-editor";
import { Tag as TagType } from "@/types/tag";

export const CreateForm = () => {
  const [isPending, startTransition] = useTransition();

  const [preview, setPreview] = useState("");
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File>();

  const [tags, setTags] = useState<TagType[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const form = useForm<z.infer<typeof NewDiscussionSchema>>({
    resolver: zodResolver(NewDiscussionSchema),
    mode: "onChange",
  });

  const { setValue } = form;

  const onSubmit = (values: z.infer<typeof NewDiscussionSchema>) => {
    const formData = {
      ...values,
      discussionBodyHtml: htmlContent,
      discussionBody: "",
    };
    console.log(formData);
    console.log(values.discussionImage[0]);
  };

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
            name="tags"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Tags</FormLabel>
                <FormControl className="w-full">
                  <div className="h-12 rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
                    <div className="flex flex-col w-full">
                      <TagInput
                        type="text"
                        className="border-none outline-none text-muted-foreground shadow-none focus-visible:ring-0"
                        placeholder="Choose tags"
                        activeTagIndex={activeTagIndex}
                        setActiveTagIndex={setActiveTagIndex}
                        tags={tags}
                        maxTags={4}
                        minTags={4}
                        setTags={(newTags) => {
                          setTags(newTags);
                          setValue("tags", newTags as [Tag, ...Tag[]]);
                        }}
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
            name="discussionBody"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discussion Content</FormLabel>
                <FormControl>
                  <Editor
                    setHtmlContent={(content) => {
                      setHtmlContent(content);
                      field.onChange(content);
                    }}
                  />
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
                  <FormLabel>Circle Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      {...rest}
                      onChange={(event) => {
                        const { files, displayUrl } = getImageData(event);
                        setPreview(displayUrl);
                        onChange(files);
                        setUploadedFile(files[0]);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Choose best image that bring spirits to your circle.
                  </FormDescription>
                  <FormMessage />
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={preview} />
                    <AvatarFallback>BU</AvatarFallback>
                  </Avatar>
                </FormItem>
              </>
            )}
          />
          <Button className="w-fit" variant="default" type="submit">
            Publish
          </Button>
        </div>
      </form>
    </Form>
  );
};
