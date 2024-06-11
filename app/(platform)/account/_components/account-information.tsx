"use client";

import * as z from "zod";

import Image from "next/image";
import { useState, useTransition } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileSchema } from "@/schemas";

import { Header } from "./header";

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
import { useCurrentUser } from "@/hooks/use-current-user";

export const AccountInformation = () => {
  const user = useCurrentUser();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const handleEditClick = () => {
    setIsEdit(!isEdit);
  };

  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    mode: "onChange",
    defaultValues: {
      fullname: user?.fullname!,
      phoneNumber: "",
    },
  });

  const onSubmit = (values: z.infer<typeof EditProfileSchema>) => {
    console.log(values);
  };
  return (
    <div className="w-full flex flex-col gap-y-6 px-1">
      <div className="w-full flex justify-between items-start">
        <Header title="Account Information" />
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
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                value={user?.email!}
                type="Email"
                placeholder="Enter the Email"
                disabled={true}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input
                value={user?.username}
                type="text"
                placeholder="Enter username"
                disabled={true}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fullname</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter fullname"
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
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter phone number"
                    disabled={!isEdit || isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isEdit && (
            <div className="flex justify-end ">
              <Button type="submit" disabled={isPending}>
                Save Changes
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};
