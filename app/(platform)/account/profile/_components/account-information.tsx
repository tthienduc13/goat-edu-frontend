"use client";

import * as z from "zod";

import Image from "next/image";
import { useState, useTransition } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileSchema } from "@/schemas/account";

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
import { useCurrentUser } from "@/hooks/use-current-user";
import { AtSign, Mail, Phone, User } from "lucide-react";
import { cn } from "@/lib/utils";

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
      fullname: user?.fullname ?? "Not set yet",
      phoneNumber: user?.phoneNumber ?? "Not set yet",
    },
  });

  const onSubmit = (values: z.infer<typeof EditProfileSchema>) => {
    // TODO: Add function
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
            <FormLabel>User Name</FormLabel>
            <div className="h-12 rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
              <AtSign
                className={cn("h-5 w-5 mr-2 text-primary hover:text-white")}
              />
              <div className="flex flex-col">
                <div className="border-none px-3 outline-none text-primary shadow-none focus-visible:ring-0 ">
                  {user?.username}
                </div>
              </div>
            </div>
          </FormItem>
          <FormItem>
            <FormLabel>Email</FormLabel>
            <div className="h-12 rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
              <Mail
                className={cn("h-5 w-5 mr-2 text-primary hover:text-white")}
              />
              <div className="flex flex-col w-full">
                <div className="border-none w-full px-3 outline-none text-primary shadow-none focus-visible:ring-0 ">
                  {user?.email}
                </div>
              </div>
            </div>
          </FormItem>
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Fullname</FormLabel>
                <FormControl>
                  <div className="h-12 w-full rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
                    <User
                      className={cn(
                        "h-5 w-5 mr-2 text-muted-foreground hover:text-white",
                        form.formState.errors.fullname && "text-destructive"
                      )}
                    />
                    <div className="flex flex-col w-full">
                      <Input
                        type="text"
                        placeholder="Enter fullname"
                        disabled={!isEdit || isPending}
                        className="border-none text-base outline-none text-muted-foreground shadow-none focus-visible:ring-0 "
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
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <div className="h-12 rounded-xl overflow-hidden flex flex-row items-center bg-[#a8b3cf14] px-4">
                    <Phone
                      className={cn(
                        "h-5 w-5 mr-2 text-muted-foreground hover:text-white",
                        form.formState.errors.fullname && "text-destructive"
                      )}
                    />
                    <div className="flex flex-col w-full">
                      <Input
                        type="text"
                        placeholder="New phone number"
                        disabled={!isEdit || isPending}
                        className="border-none w-full text-base outline-none text-muted-foreground shadow-none focus-visible:ring-0 "
                        {...field}
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end ">
            <Button type="submit" disabled={isPending || !isEdit}>
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
