"use client";
import * as z from "zod";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { NewDiscussionSchema } from "@/schemas/discussion";
import { Discussion } from "@/types/discussion";
import { useSearchParams } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/enhanced-button";

import { ArrowUpFromLine, ImageUp, LoaderCircle } from "lucide-react";

import NotFound from "@/app/not-found";
import { getImageData } from "@/lib/get-image-data";
import Editor from "@/components/novel/novel-editor";

interface EditDiscussionFormProps {
  userId: string;
}

export const EditDiscussionForm = ({ userId }: EditDiscussionFormProps) => {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [uploadedFile, setUploadedFile] = useState<File>();
  const [preview, setPreview] = useState("");
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [jsonContent, setJsonContent] = useState<string>("");

  const params = searchParams.get("data");

  const data: Discussion = JSON.parse(params!);

  const form = useForm<z.infer<typeof NewDiscussionSchema>>({
    resolver: zodResolver(NewDiscussionSchema),
    defaultValues: {
      discussionName: data.discussionName,
      discussionBody: data.discussionBody,
      discussionBodyHtml: data.discussionImage,
      discussionImage: data.discussionImage,
      tags: data.tags,
      subjectId: "",
    },
  });

  const handleBrowseImage = () => {
    document.getElementById("imageImporter")?.click();
  };

  const handleOnchangeimage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files, displayUrl } = getImageData(event);
    setPreview(displayUrl);
    setUploadedFile(files[0]);
  };

  const onSubmit = (values: z.infer<typeof NewDiscussionSchema>) => {
    // const formData: z.infer<typeof NewDiscussionSchema> = {
    //   ...values,
    //   discussionBodyHtml: htmlContent,
    //   discussionBody: jsonContent,
    //   discussionImage: uploadedFile ?? null,
    // };
    // startTransition();
    console.log(values);
  };

  useEffect(() => {
    if (data) {
      setHtmlContent(data.discussionBodyHtml);
      setJsonContent(data.discussionBody);
    }
  }, [data]);

  if (!data) {
    NotFound();
  }

  return (
    <Form {...form}>
      <form
        className="w-full flex flex-col gap-y-10"
        // onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="left-0 px-5 py-4 rounded-lg border-[2px] shadow-lg w-full justify-between flex items-center">
          <div className="flex flex-col gap-y-2">
            <div className="w-full flex flex-row items-center gap-x-2">
              <h1 className="text-xl font-semibold px-2 py-1 rounded-lg bg-secondary">
                {data.userAndSubject.subjectName}
              </h1>
            </div>
            <div className="flex flex-row gap-x-2">
              {data.tags.map((tag) => (
                <div
                  key={tag.id}
                  className="text-sm bg-secondary px-3 py-1 rounded-lg"
                >
                  #{tag.tagName}
                </div>
              ))}
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
                <div>Updating</div>
              </>
            ) : (
              <>
                <div>Update</div>
                <ArrowUpFromLine className="h-4 w-4 ml-2" />
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
          <FormField
            control={form.control}
            name="discussionImage"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
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
                      {preview || data.discussionImage ? (
                        <Image
                          src={preview || data.discussionImage}
                          alt="preview image"
                          fill
                          objectFit="contain"
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
                <FormControl>
                  <Editor
                    initialData={data.discussionBody}
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
  );
};
