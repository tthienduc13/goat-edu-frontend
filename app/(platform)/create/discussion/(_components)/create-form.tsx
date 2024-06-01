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
import { NewDiscussionSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PlateEditor from "@/components/plate-editor";
import ImageUpload from "@/components/custom/image-upload";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const CreateForm = () => {
  const [preview, setPreview] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File>();

  const form = useForm<z.infer<typeof NewDiscussionSchema>>({
    resolver: zodResolver(NewDiscussionSchema),
    mode: "onChange",
    defaultValues: {
      discussionName: "",
      discussionImage: {},
    },
  });

  const onSubmit = (values: z.infer<typeof NewDiscussionSchema>) => {
    console.log(values);
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
                <FormLabel>Discussion title:</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your email or username..."
                    //   disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <PlateEditor />
          <FormField
            control={form.control}
            name="discussionImage"
            render={({ field: { onChange, value, ...rest } }) => (
              <>
                <FormItem>
                  <FormLabel>Circle Image</FormLabel>
                  <FormControl>
                    {/* <ImageUpload /> */}
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
        </div>
      </form>
    </Form>
  );
};

function getImageData(event: React.ChangeEvent<HTMLInputElement>) {
  const dataTransfer = new DataTransfer();

  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}
