"use client";

import * as z from "zod";

import { AuthError } from "next-auth";
import { useState, useTransition } from "react";
import { LoginSchema } from "@/schemas";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/custom/input-field";

import { FormError } from "@/components/forms/form-error";
import { FormSuccess } from "@/components/forms/form-success";

import { BackButton } from "@/components/auth/back-button";
import { CardWrapper } from "@/components/auth/card-wrapper";

import { Login } from "@/actions/login";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { LoaderCircle } from "lucide-react";

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");

  const [formError, setFormError] = useState<string | undefined>("");
  const [formSuccess, setFormSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setFormError("");
    setFormSuccess("");

    try {
      startTransition(() => {
        Login(values, callbackUrl)
          .then((data) => {
            if (data?.error) {
              reset();
              setFormError(data.error);
            }
            if (data?.success) {
              reset();
              router.push("/browse");
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
      headerTitle="Log in"
      backButtonHref="/auth/register"
      backButtonLabel="Not a member yet?"
      backButtonColor="white"
      showSocial
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="w-full flex flex-col gap-y-4">
          <InputField
            name="username"
            label="Username"
            placeholder="Username"
            type="string"
            register={register}
            error={errors.username}
          />
          <InputField
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
            register={register}
            error={errors.password}
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
    </CardWrapper>
  );
};

export default LoginForm;
