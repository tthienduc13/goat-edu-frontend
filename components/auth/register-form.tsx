"use client";

import * as z from "zod";

import { useState, useTransition } from "react";
import { RegisterSchema } from "@/schemas";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoaderCircle } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { FormError } from "@/components/forms/form-error";
import { InputField } from "@/components/custom/input-field";
import { FormSuccess } from "@/components/forms/form-success";
import { CardWrapper } from "@/components/auth/card-wrapper";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Register } from "@/actions/register";
import { useRoles } from "@/app/api/role/role.query";
import { Role } from "@/types/role";

export const RegisterForm = () => {
  const { data, isLoading, error } = useRoles();

  const [formError, setFormError] = useState<string | undefined>("");
  const [formSuccess, setFormSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      fullname: "",
      username: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = form;

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setFormError("");
    setFormSuccess("");

    startTransition(() => {
      Register(values).then((data) => {
        setFormError(data.error);
        setFormSuccess(data.success);
      });
    });
  };

  if (isLoading) return null;
  if (error) return null;

  return (
    <CardWrapper
      headerTitle="Sign up"
      backButtonHref="/auth/login"
      backButtonLabel="Already have an account?"
      backButtonColor="white"
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
          <div className="w-full flex flex-col gap-y-4">
            <FormField
              name="email"
              render={() => (
                <InputField
                  name="email"
                  label="Email"
                  placeholder="Email"
                  type="email"
                  register={register}
                  error={errors.email}
                />
              )}
            />
            <InputField
              name="fullname"
              label="Fullname"
              placeholder="Fullname"
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
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full h-10 ">
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data?.map((role: Role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.roleName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage className="text-muted-foreground" />
                </FormItem>
              )}
            />
            <FormError message={formError || error!} />
            <FormSuccess message={formSuccess} />
          </div>
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
          <div className=" gap-x-3 py-3">
            <Button
              disabled={isPending || isLoading}
              variant="default"
              type="submit"
              className="w-full"
              size="lg"
            >
              {isPending && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              <div>Create an account</div>
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
