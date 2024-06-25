"use client";

import { useRef, useState, useTransition } from "react";

import { Header } from "@/app/(platform)/account/_components/header";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

import { getImageData } from "@/lib/get-image-data";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/use-current-user";
import { patchUserProfile } from "@/app/api/user/user.api";
import { useSession } from "next-auth/react";

export const AvatarChanging = () => {
  const user = useCurrentUser();
  const { update } = useSession();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState("");
  const [imageState, setImageState] = useState<File | null>(null);

  const [isPending, startTransition] = useTransition();

  const isValidFileType = (file: File) => {
    const acceptedTypes = ["image/png", "image/jpeg"];
    return acceptedTypes.includes(file.type);
  };

  const handleBrowseImage = () => {
    document.getElementById("imageImporter")?.click();
  };

  const handleOnChangeSeleteImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target?.files?.[0];
    if (file && isValidFileType(file)) {
      const { files, displayUrl } = getImageData(event);
      setPreview(displayUrl);
      setImageState(files[0]);
    } else {
      setImageState(null);
      alert("Invalid file type!");
    }
  };

  const handleSaveImage = () => {
    startTransition(async () => {
      try {
        if (imageState) {
          const token = user?.token!;
          const response = await patchUserProfile({
            token: token,
            imageFile: imageState,
          });
          console.log(response.data);
          if (response.status === 200) {
            toast.success("Image updated successfully!");
            await update({
              user: { ...user, image: response.data },
            });
          } else {
            toast.error("Failed to update image.");
          }
        }
      } catch (error) {
        console.error("Failed to save image:", error);
        toast.error("An error occurred while updating the image.");
      }
    });
  };

  return (
    <div className="w-full flex flex-col gap-y-6">
      <Header
        title="Profile picture"
        label="Upload a picture to make your profile stand out and let people recognize your comments and contributions easily!"
      />
      <div className="flex w-full justify-between items-end ">
        <div className="rounded-[10px] overflow-hidden">
          <Avatar className="w-24 h-24">
            <AvatarImage src={preview ? preview : user?.image!} />
            <AvatarFallback>GE</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-row gap-[16px]">
          <div>
            <Input
              type="file"
              name="file"
              id="imageImporter"
              className="hidden"
              multiple
              ref={fileInputRef}
              onChange={(event) => handleOnChangeSeleteImage(event)}
            />
            <div className="flex flex-row gap-5">
              <Button disabled={isPending} onClick={() => handleBrowseImage()}>
                Change Image
              </Button>

              {imageState ? (
                <Button disabled={isPending} onClick={() => handleSaveImage()}>
                  {isPending && (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
