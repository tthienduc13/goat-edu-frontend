"use client";

import * as z from "zod";

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
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getImageData } from "@/lib/get-image-data";
import Editor from "@/components/novel/novel-editor";

export const CreateForm = () => {
  const [preview, setPreview] = useState("");
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File>();

  const form = useForm<z.infer<typeof NewDiscussionSchema>>({
    resolver: zodResolver(NewDiscussionSchema),
    mode: "onChange",
    defaultValues: {
      discussionName: "",
      discussionBody: "",
      discussionImage: {},
    },
  });

  const onSubmit = (values: z.infer<typeof NewDiscussionSchema>) => {
    const formData = {
      ...values,
      discussionBody: htmlContent,
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
              <FormItem>
                <FormLabel className="text-2xl">Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="What's your problem?"
                    //   disabled={loading}
                    {...field}
                  />
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
          <Button className="w-1/6" variant="default" type="submit">
            Publish
          </Button>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        </div>
      </form>
    </Form>
    // <TagField suggestions={[]} state={tags} setState={setTags} />
  );
};
