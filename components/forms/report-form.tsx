"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { ReportSchema } from "@/schemas/report";
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
import { toast } from "sonner";
import { report } from "@/actions/report";
import { useCurrentUser } from "@/hooks/use-current-user";
import useReportDialogStore from "@/stores/useReportDialogStore";
import { LoaderCircle } from "lucide-react";

export const ReportForm = () => {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const { setIsOpenReportDialog } = useReportDialogStore();

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
            setIsOpenReportDialog(false);
            toast.error(data.error);
          }
          if (data?.success) {
            form.reset();
            setIsOpenReportDialog(false);
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
          <Button type="submit" disabled={isPending}>
            {isPending && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            Send
          </Button>
        </div>
      </form>
    </Form>
  );
};
