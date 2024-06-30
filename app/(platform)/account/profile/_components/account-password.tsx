"use client";

import * as z from "zod";

import Image from "next/image";
import { useState, useTransition } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordSchema } from "@/schemas/account";

import { Header } from "@/app/(platform)/account/_components/header";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import EditIconAnimate from "@/assets/gif/edit.gif";
import EditIconPause from "@/assets/gif/edit_pause.png";
import { Eye, EyeOff, LoaderCircle, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChangePassword } from "@/actions/change-password";
import { toast } from "sonner";

export const AccountPassword = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: "onChange",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const handleEditClick = () => {
    setIsEdit(!isEdit);
  };

  const onSubmit = (values: z.infer<typeof ChangePasswordSchema>) => {
    startTransition(() =>
      ChangePassword(values).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
          setIsEdit(false);
        }
        form.reset();
      })
    );
  };
  return (
    <div className="w-full flex flex-col gap-y-6 px-1">
      <div className="w-full flex justify-between items-start">
        <Header title="Change password" />
        <button
          className="w-[28px] h-[28px] flex items-center justify-center hover:scale-125 rounded-[50%] hover:border-[1px] hover:border-blue-700 cursor-pointer transition"
          onClick={handleEditClick}
        >
          <Image
            src={isEdit ? EditIconAnimate : EditIconPause}
            alt="Edit"
            width={18}
            height={18}
          />
        </button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-5"
        >
          <div className=" flex flex-row items-center gap-x-8">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Old password</FormLabel>
                  <FormControl>
                    <div className="h-12 w-full rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
                      <Lock
                        className={cn(
                          "h-5 w-5 mr-2 text-muted-foreground hover:text-white",
                          form.formState.errors.oldPassword &&
                            "text-destructive"
                        )}
                      />
                      <Input
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Password"
                        disabled={isPending || !isEdit}
                        className="border-none text-base w-full outline-none flex-1 text-muted-foreground shadow-none focus-visible:ring-0 "
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
              name="newPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <div className="h-12 w-full rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
                      <Lock
                        className={cn(
                          "h-5 w-5 mr-2 text-muted-foreground hover:text-white",
                          form.formState.errors.oldPassword &&
                            "text-destructive"
                        )}
                      />
                      <Input
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="New password"
                        disabled={isPending || !isEdit}
                        className="border-none text-base w-full outline-none flex-1 text-muted-foreground shadow-none focus-visible:ring-0 "
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
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isPending || !isEdit}>
              {isPending ? (
                <div className="flex flex-row items-center">
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Saving Changes
                </div>
              ) : (
                "  Set Password"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
