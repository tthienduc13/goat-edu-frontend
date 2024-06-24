"use client";

import { useRef, useState } from "react";

import { Header } from "@/app/(platform)/account/_components/header";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

import { getImageData } from "@/lib/get-image-data";
import { patchUserProfile } from "@/app/api/user/user.api";
import { useCurrentUser } from "@/hooks/use-current-user";

export const AvatarChanging = () => {
  const user = useCurrentUser();

  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState("");
  const [imageState, setImageState] = useState<File | null>(null);

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

  const handleSaveImage = async () => {
    try {
      if (imageState) {
        const token = user?.token!;
        const fullName = "Nguyen Le Thien Duc";
        const phoneNumber = "0942864880";
        const password = "";

        const response = await patchUserProfile({
          token: token,
          fullName: fullName,
          phoneNumber: phoneNumber,
          imageFile: imageState,
          password: password,
        });
        console.log(response);
      }
    } catch (error) {
      console.error("Failed to save image:", error); // Handle and log any errors that occur
    }
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
              onSubmit={() => {
                console.log("Submit");
              }}
            />
            <div className="flex flex-row gap-5">
              <Button onClick={() => handleBrowseImage()}>Change Image</Button>

              {imageState ? (
                <Button onClick={() => handleSaveImage()}>Save</Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
