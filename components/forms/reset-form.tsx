"use client";

import * as z from "zod";

import { useState, useTransition } from "react";
import { ForgotPasswordSchema } from "@/schemas/auth";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import { FormError } from "@/components/forms/form-error";
import { FormSuccess } from "@/components/forms/form-success";
import { CardWrapper } from "../auth/card-wrapper";
import { LoaderCircle, Mail } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
    setError("");
    setSuccess("");

    console.log(values);
  };

  return (
    <CardWrapper
      headerTitle="Reset password"
      headerLabel="Enter the email address you registered with and we will send you a verification code."
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      backButtonColor="white"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full ">
          <div className="w-full flex flex-col gap-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="h-12 rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
                      <Mail
                        className={cn(
                          "h-5 w-5 mr-2 text-muted-foreground hover:text-white",
                          form.formState.errors.email && "text-destructive"
                        )}
                      />
                      <div className="flex flex-col w-full">
                        <Input
                          type="email"
                          placeholder="Email"
                          disabled={isPending}
                          className="w-full border-none outline-none text-muted-foreground shadow-none focus-visible:ring-0 "
                          {...field}
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <div className="py-5">
            <Button
              disabled={isPending}
              variant="default"
              type="submit"
              className="w-full"
              size="lg"
            >
              {isPending && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              <div>Send verification code</div>
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetForm;
