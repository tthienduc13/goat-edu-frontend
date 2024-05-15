"use client";

import * as z from "zod";

import { useState, useTransition } from "react";
import { NewPasswordSchema } from "@/schemas";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { FormError } from "@/components/form-error";
import { InputField } from "@/components/input-field";
import { FormSuccess } from "@/components/form-success";
import { CardWrapper } from "./card-wrapper";

export const NewPasswordForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
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
      headerTitle="Change password"
      headerLabel="Please enter your new password. A password strength meter will guide you if your password is strong enough."
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      backButtonColor="white"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
        <div className="w-full flex flex-col gap-y-4">
          <InputField
            name="password"
            label="Password"
            placeholder="Create new password"
            type="password"
            register={register}
            error={errors.password}
            isValid={isValid}
            watch={watch}
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
            <div>Change password</div>
          </Button>
        </div>
      </form>
    </CardWrapper>
  );
};

export default NewPasswordForm;
