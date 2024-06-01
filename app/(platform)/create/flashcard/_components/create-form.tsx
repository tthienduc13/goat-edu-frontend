"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { InputField } from "@/components/custom/input-field";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { NewFlashcardSchema } from "@/schemas";

export const CreateForm = () => {
  const form = useForm<z.infer<typeof NewFlashcardSchema>>({
    resolver: zodResolver(NewFlashcardSchema),
    mode: "onChange",
    defaultValues: {
      flashcardName: "",
      flashcardDescription: "",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = form;

  const onSubmit = (values: z.infer<typeof NewFlashcardSchema>) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-y-10 "
      >
        <div className="flex flex-row w-full justify-between items-center">
          <h1 className="text-2xl">Create new flashcard set</h1>
          <Button>Create</Button>
        </div>
        <InputField
          name="flashcardName"
          label="Please enter a title to create your flashcard set"
          register={register}
          placeholder="Enter a title"
        />
        <InputField
          name="flashcardDescription"
          label="Please enter a description to create your flashcard set"
          register={register}
          placeholder="Enter a description"
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value="123123">toan</SelectItem>
                  <SelectItem value="123124">tieng viet</SelectItem>
                  <SelectItem value="123125">anh van</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-muted-foreground" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
