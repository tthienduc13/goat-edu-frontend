"use client";

import * as z from "zod";

import { useState, useTransition } from "react";
import { LoginSchema } from "@/schemas";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { InputField } from "@/components/input-field";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { BackButton } from "./back-button";
import { CardWrapper } from "./card-wrapper";

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    console.log(values);

    // startTransition(() => {
    //   Login(values).then((data) => {
    //     setError(data.error);
    //     setSuccess(data.success);
    //   });
    // });
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
            name="email"
            label="Email"
            placeholder="Email"
            type="email"
            register={register}
            error={errors.email}
          />
          {/* Password */}
          <InputField
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
            register={register}
            error={errors.password}
          />
          <div className="flex flex-row  w-full py-5 justify-between items-center ">
            <div className="max-w-[150px]">
              <BackButton
                color="default"
                href="/auth/reset"
                label="Forgot password?"
              />
            </div>
            <Button
              disabled={isPending}
              variant="secondary"
              size="lg"
              type="submit"
              className="max-w-[150px] w-full"
            >
              {isPending && <Spinner size="xs" className="mr-2 " />}
              <div>Login</div>
            </Button>
          </div>
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
      </form>
    </CardWrapper>
  );
};

export default LoginForm;
