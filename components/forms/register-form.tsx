"use client";

import * as z from "zod";

import { useState, useTransition } from "react";
import { RegisterSchema } from "@/schemas/auth";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { toast } from "sonner";

import {
  AtSign,
  Eye,
  EyeOff,
  LoaderCircle,
  Lock,
  Mail,
  User,
} from "lucide-react";

import { FormError } from "@/components/forms/form-error";
import { FormSuccess } from "@/components/forms/form-success";
import { CardWrapper } from "@/components/auth/card-wrapper";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
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
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const router = useRouter();
  const { data, isLoading, error } = useRoles();

  const [formError, setFormError] = useState<string | undefined>("");
  const [formSuccess, setFormSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

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

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setFormError("");
    setFormSuccess("");

    startTransition(() => {
      Register(values).then((data) => {
        if (data.error) {
          setFormError(data.error);
        } else {
          form.reset();
          router.push("/auth/login");
          toast.success("Please check email and verify your account");
        }
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
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full ">
          <div className="w-full flex flex-col gap-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="h-12 rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
                      <Mail
                        className={cn(
                          "h-5 w-5 mr-2 text-muted-foreground hover:text-white",
                          form.formState.errors.email && "text-destructive"
                        )}
                      />
                      <div className="flex flex-col w-full">
                        <Input
                          type="email"
                          placeholder="Email"
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
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="h-12 rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
                      <User
                        className={cn(
                          "h-5 w-5 mr-2 text-muted-foreground hover:text-white",
                          form.formState.errors.fullname && "text-destructive"
                        )}
                      />
                      <div className="flex flex-col w-full">
                        <Input
                          type="text"
                          placeholder="Fullname"
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
            {isLoading ? (
              <Skeleton className="h-12 w-full"></Skeleton>
            ) : (
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
                        <SelectTrigger className="h-12 rounded-lg overflow-hidden outline-none focus-visible:ring-0 flex flex-row items-center bg-[#a8b3cf14] px-4">
                          <SelectValue placeholder="Are you a student or teacher" />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormError message={formError || error!} />
            <FormSuccess message={formSuccess} />
            <div className=" py-5">
              <Button
                disabled={isPending || isLoading}
                variant="default"
                type="submit"
                className="w-full"
                size="lg"
              >
                {isPending ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    <div>Creating your account</div>
                  </>
                ) : (
                  <div>Create an account</div>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
