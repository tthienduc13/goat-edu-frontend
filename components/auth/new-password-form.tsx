"use client";

import * as z from "zod";

import { useState, useTransition } from "react";
import { NewPasswordSchema } from "@/schemas/auth";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import { FormError } from "@/components/forms/form-error";
import { FormSuccess } from "@/components/forms/form-success";
import { CardWrapper } from "./card-wrapper";
import { Eye, EyeOff, LoaderCircle, Lock } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

export const NewPasswordForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");
  };

  return (
    <CardWrapper
      headerTitle="Change password"
      headerLabel="Please enter your new password. A password strength meter will guide you if your password is strong enough."
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      backButtonColor="white"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full ">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="h-12 w-full rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
                    <Lock
                      className={cn(
                        "h-5 w-5 mr-2 text-muted-foreground hover:text-white",
                        form.formState.errors.password && "text-destructive"
                      )}
                    />
                    <Input
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="********"
                      disabled={isPending}
                      className="border-none w-full outline-none flex-1 text-muted-foreground shadow-none focus-visible:ring-0 "
                      {...field}
                    />
                    <div
                      onClick={togglePasswordVisibility}
                      className="cursor-pointer"
                    >
                      {isPasswordVisible ? (
                        <EyeOff
                          className={cn(
                            "h-5 w-5 mr-2 rotate-180 text-muted-foreground hover:text-primary"
                          )}
                        ></EyeOff>
                      ) : (
                        <Eye
                          className={cn(
                            "h-5 w-5 mr-2 rotate-180 text-muted-foreground hover:text-primary"
                          )}
                        ></Eye>
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
              <div>Change password</div>
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewPasswordForm;
