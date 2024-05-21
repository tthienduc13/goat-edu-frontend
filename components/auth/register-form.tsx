"use client";

import * as z from "zod";

import { useState, useTransition } from "react";
import { RegisterSchema } from "@/schemas";

import { cn } from "@/lib/utils";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Checkbox } from "@/components/ui/checkbox";

import { FormError } from "@/components/form-error";
import { InputField } from "@/components/input-field";
import { FormSuccess } from "@/components/form-success";
import { CardWrapper } from "@/components/auth/card-wrapper";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Register } from "@/actions/register";
import { useRoles } from "@/api/role/use-role";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

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
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full ">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full h-10 justify-between bg-[#a8b3cf14]",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? data?.find((role) => role.id === field.value)
                                ?.roleName
                            : "Select role"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[360px] bg-[#a8b3cf14] p-0">
                      <Command className="w-[360px]">
                        <CommandList className="w-[360px]">
                          {data?.map((role) => (
                            <CommandItem
                              className="w-[360px]"
                              value={role.roleName}
                              key={role.id}
                              onSelect={() => {
                                form.setValue("role", role.id);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  role.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {role.roleName}
                            </CommandItem>
                          ))}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
              disabled={isPending}
              variant="default"
              type="submit"
              className="w-full"
              size="lg"
            >
              {isPending && <Spinner size="xs" className="mr-2" />}
              <div>Create an account</div>
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
