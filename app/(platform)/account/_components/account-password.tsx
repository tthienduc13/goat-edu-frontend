"use client";

import { Header } from "./header";
import { useState, useTransition } from "react";
import Image from "next/image";

import EditIconAnimate from "@/assets/gif/edit.gif";
import EditIconPause from "@/assets/gif/edit_pause.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { ChangePasswordSchema } from "@/schemas";

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

export const AccountPassword = () => {
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
    console.log(values);
  };
  return (
    <div className="w-full flex flex-col gap-y-6">
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
          <div className="justify-between flex">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old password</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[300px]"
                      type="password"
                      placeholder="Enter old password"
                      disabled={!isEdit || isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[300px]"
                      type="password"
                      placeholder="Enter new password"
                      disabled={!isEdit || isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {isEdit && (
            <div className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                Save
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};
