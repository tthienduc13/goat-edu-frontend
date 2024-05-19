"use client";

import * as z from "zod";

import { useState, useTransition } from "react";
import { RegisterSchema } from "@/schemas";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { FormError } from "@/components/form-error";
import { InputField } from "@/components/input-field";
import { FormSuccess } from "@/components/form-success";
import { Checkbox } from "../ui/checkbox";
import { CardWrapper } from "./card-wrapper";
import { toast } from "sonner";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      fullname: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
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
      headerTitle="Sign up"
      // headerLabel="Sign up"
      backButtonHref="/auth/login"
      backButtonLabel="Already have an account?"
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
          <InputField
            name="fullname"
            label="Full name"
            placeholder="Full name"
            type="text"
            register={register}
            error={errors.fullname}
          />
          <InputField
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
            register={register}
            error={errors.password}
            isValid={isValid}
            watch={watch}
          />
          <InputField
            name="username"
            label="Enter a username"
            placeholder="Enter a username"
            type="text"
            register={register}
            error={errors.username}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <span className="pb-4 mt-4 h-full block typo-subhead text-[#cfd6e6] border-b border-slate-600">
          Your email will be used to send you product and community updates
        </span>
        <div className="items-top flex space-x-2 py-4  border-b border-slate-600 text-muted-foreground ">
          <Checkbox id="terms1" />
          <label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I don’t want to receive updates and promotions via email
          </label>
        </div>
        <div className="p-3">
          <Button
            disabled={isPending}
            variant="secondary"
            type="submit"
            className="w-full"
            size="lg"
          >
            {isPending && <Spinner size="xs" className="mr-2" />}
            <div>Create an account</div>
          </Button>
        </div>
      </form>
    </CardWrapper>
  );
};

export default RegisterForm;
