"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { CheckEmailSchema } from "@/schemas";

import { MoveRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/custom/input-field";

import { FormError } from "@/components/forms/form-error";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export const CheckEmailForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CheckEmailSchema>>({
    resolver: zodResolver(CheckEmailSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof CheckEmailSchema>) => {
    setError("");
    // setSuccess("");

    startTransition(() => {
      console.log(values);
      // Login(values).then((data) => {
      //   setError(data?.error);
      //   setSuccess(data?.success);
      // });
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={(field) => (
                <FormItem>
                  <FormControl>
                    <InputField
                      {...field}
                      name="email"
                      label="Email"
                      placeholder="Email"
                      type="email"
                      register={form.register}
                      error={form.formState.errors.email}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <Button
            disabled={isPending}
            size="lg"
            type="submit"
            className="font-bold"
            variant="secondary"
          >
            Sign up - it&apos;s free
            <MoveRight className="w-5 h-6 ml-2 font-bold"></MoveRight>
          </Button>
        </form>
      </Form>
    </>
  );
};
