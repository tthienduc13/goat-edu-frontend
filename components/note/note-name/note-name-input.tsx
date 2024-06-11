"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { NoteNameSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePatchNote } from "@/app/api/note/note.query";
import { useDebouncedCallback } from "use-debounce";
import { useCurrentUser } from "@/hooks/use-current-user";

interface NoteNameInputProps {
  id: string;
  noteName: string;
}

export const NoteNameInput = ({ noteName, id }: NoteNameInputProps) => {
  const user = useCurrentUser();

  const form = useForm<z.infer<typeof NoteNameSchema>>({
    resolver: zodResolver(NoteNameSchema),
    mode: "onChange",
    defaultValues: {
      noteName: noteName,
    },
  });

  const { mutate: patchName } = usePatchNote(user?.token!, id, user?.id!);

  const onSubmit = (values: z.infer<typeof NoteNameSchema>) => {
    patchName(values.noteName);
  };

  const debounceUpdate = useDebouncedCallback(
    (values: z.infer<typeof NoteNameSchema>) => {
      onSubmit(values);
    },
    500
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="noteName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  className="border-none shadow-none outline-none focus:outline-none focus-visible:ring-0"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    debounceUpdate({ noteName: e.target.value });
                  }}
                ></Input>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
