"use client";

import * as z from "zod";

import { useState, useTransition } from "react";
import { ForgotPasswordSchema } from "@/schemas";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { FormError } from "@/components/form-error";
import { InputField } from "@/components/input-field";
import { FormSuccess } from "@/components/form-success";
import { CardWrapper } from "./card-wrapper";

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof ForgotPasswordSchema>>({
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

    // startTransition(() => {
    //   Login(values).then((data) => {
    //     setError(data.error);
    //     setSuccess(data.success);
    //   });
    // });
  };

  return (
    <CardWrapper
      headerTitle="Reset password"
      headerLabel="Enter the email address you registered with and we will send you a verification code."
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      backButtonColor="white"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
        <div className="w-full flex flex-col gap-y-4">
          <InputField
            name="email"
            label="Email"
            placeholder="Email"
            type="email"
            register={register}
            error={errors.email}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className="py-5">
          <Button
            disabled={isPending}
            variant="secondary"
            type="submit"
            className="w-full"
            size="lg"
          >
            {isPending && <Spinner size="xs" className="mr-2" />}
            <div>Send verification code</div>
          </Button>
        </div>
      </form>
    </CardWrapper>
  );
};

export default ResetForm;
