import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Header } from "@/app/(platform)/account/_components/header";

export const AccountDeletion = () => {
  return (
    <div className="w-full flex flex-col gap-y-6 px-1">
      <Header title="🚨 Danger Zone" />
      <div className="border-[2px] border-destructive bg-destructive/20 rounded-xl px-6 py-4 flex flex-col gap-y-6 text-muted-foreground text-sm font-medium ">
        <div>Deleting your account will:</div>
        <div className="flex flex-col">
          <span>
            1. Permanently delete your profile, along with your authentication
            associations.
          </span>
          <span>
            2. Permanently delete all your content, including your posts,
            bookmarks, comments, upvotes, etc.
          </span>
          <span>3. Allow your username to become available to anyone.</span>
        </div>
        <div>
          Important: deleting your account is unrecoverable and cannot be
          undone. Feel free to contact{" "}
          <Link className="text-blue-600" href={""}>
            support@goat.edu
          </Link>{" "}
          with any questions.
        </div>
        <Button className="w-fit" variant={"destructive"}>
          Delete my account
        </Button>
      </div>
    </div>
  );
};
