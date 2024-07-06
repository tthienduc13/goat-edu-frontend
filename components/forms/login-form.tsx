"use client";

import * as z from "zod";

import { AuthError } from "next-auth";
import { useState, useTransition } from "react";
import { LoginSchema } from "@/schemas/auth";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import { FormError } from "@/components/forms/form-error";
import { FormSuccess } from "@/components/forms/form-success";

import { BackButton } from "@/components/auth/back-button";
import { CardWrapper } from "@/components/auth/card-wrapper";

import { Login } from "@/actions/login";
import { useSearchParams } from "next/navigation";

import { AtSign, Eye, EyeOff, LoaderCircle, Lock } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const LoginForm = () => {
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");

  const [formError, setFormError] = useState<string | undefined>("");
  const [formSuccess, setFormSuccess] = useState<string | undefined>("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setFormError("");
    setFormSuccess("");

    try {
      startTransition(() => {
        Login(values, callbackUrl)
          .then((data) => {
            if (data?.error) {
              form.reset();
              setFormError(data.error);
            }
            if (data?.success) {
              form.reset();
              setFormSuccess(data.success);
            }
          })
          .catch(() => setFormError("Something went wrong!"));
      });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Invalid credentials!" };
          default:
            return { error: "Something went wrong!" };
        }
      }

      throw error;
    }
  };

  return (
    <CardWrapper
      headerTitle="Welcome back!"
      backButtonHref="/auth/register"
      backButtonLabel="Not a member yet?"
      backButtonColor="white"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="w-full flex flex-col gap-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="h-12 rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
                      <AtSign
                        className={cn(
                          "h-5 w-5 mr-2 text-muted-foreground hover:text-white",
                          form.formState.errors.username && "text-destructive"
                        )}
                      />
                      <div className="flex flex-col w-full">
                        <Input
                          type="text"
                          placeholder="Username"
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
            <div className="flex flex-row w-full py-5 justify-between items-center ">
              <div className="max-w-[150px]">
                <BackButton
                  color="default"
                  href="/auth/reset"
                  label="Forgot password?"
                />
              </div>
              <Button
                disabled={isPending}
                variant="default"
                size="lg"
                type="submit"
                className="max-w-[150px] w-full"
              >
                {isPending && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                <div>Login</div>
              </Button>
            </div>
          </div>
          <FormError message={formError} />
          <FormSuccess message={formSuccess} />
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
