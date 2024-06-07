"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { ReportSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogClose } from "../ui/dialog";
import { toast } from "sonner";
import { report } from "@/actions/report";
import { useCurrentUser } from "@/hooks/use-current-user";

export const ReportForm = () => {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ReportSchema>>({
    resolver: zodResolver(ReportSchema),
    mode: "onChange",
    defaultValues: {
      reportTitle: "",
      reportContent: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ReportSchema>) => {
    startTransition(() => {
      report(values, user?.token!)
        .then((data) => {
          if (data?.error) {
            form.reset();
            toast.error(data.error);
          }
          if (data?.success) {
            form.reset();
            toast.success(data.success);
          }
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-y-4"
      >
        <FormField
          control={form.control}
          name="reportTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter title"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reportContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="What's the problem?"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end ">
          {form.formState.isValid ? (
            <DialogClose asChild>
              <Button type="submit" disabled={isPending}>
                Send
              </Button>
            </DialogClose>
          ) : (
            <Button type="submit" disabled={isPending}>
              Send
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
