"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SampleImage from "@/assets/sample.png";

import axios from "axios";
import { getCookie } from "cookies-next";
import { Button } from "./ui/button";
function AvatarChanging(): JSX.Element {
  const fileInputRef = useRef(null);
  const [imageState, setImageState] = useState<File | null>(null);
  const [imageSource, setImageSource] = useState<string | undefined | null>(
    null
  );

  const handleBrowseImage = () => {
    document.getElementById("imageImporter")?.click();
  };
  const handleOnChangeSeleteImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target?.files?.[0];
    if (file && isValidFileType(file)) {
      setImageState(file);
    } else {
      setImageState(null);
      alert("Invalid file type!");
    }
  };
  const isValidFileType = (file: File) => {
    const acceptedTypes = [
      "image/png",
      "image/jpeg",
      "image/gif",
      "image/jpg",
      "image/webp",
    ];
    return acceptedTypes.includes(file.type);
  };

  const handleGetImageUrl = async (
    file: File
  ): Promise<string | null | undefined> => {
    const CLOUD_NAME = "dyu2kc3bl";
    // const UPLOAD_PRESET = "goat-edu-user-image";
    // const FOLDER = "user-image";

    try {
      const formData = new FormData();
      formData.append("file", file);
      //   formData.append("upload_preset", UPLOAD_PRESET);
      //   formData.append("folder", FOLDER);
      const responseData = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      const imageURL = responseData.data.secure_url;
      console.log(imageURL);
      setImageSource(imageURL);
    } catch (error) {
      console.error("Error uploading image: ", error);
      return null;
    }
  };
  useEffect(() => {
    if (imageState) {
      handleGetImageUrl(imageState);
    }
  }, [imageState, setImageSource]);
  //   const handleUpdataProfileImage = async (avatarUrl: string) => {
  //     const user_id = getCookie("user_id") as string;
  //     try {
  //       const access_token = getCookie("accessToken");
  //       if (access_token && user_id) {
  //         const response = await updateAvatar(avatarUrl, user_id);
  //         toast.success(response.data.message);
  //       }
  //     } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //         console.log(error);
  //         toast.error("Upload profile image failed!");
  //       }
  //     }
  //   };

  return (
    <div className="flex w-full flex-col xl:flex-row gap-[25px] p-[24px] shadow-primary rounded-[10px]">
      <div className="w-[300px] h-[300px] rounded-[10px] overflow-hidden">
        <Image
          src={imageState ? URL.createObjectURL(imageState) : SampleImage}
          width={1200}
          height={800}
          alt="avt"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        ></Image>
      </div>
      <div className="flex flex-row gap-[16px]">
        <div>
          <input
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
            <Button onClick={handleBrowseImage}>Browse Image</Button>
            {imageSource
              ? //   <ModifyButton
                //     textContent={"Save"}
                //     icon={""}
                //     iconPosition={"left"}
                //     backgroundColor={"bg-[#0065A9]"}
                //     method={() => {
                //       handleUpdataProfileImage(imageSource);
                //     }}
                //     tailwind={"text-white"}
                //   ></ModifyButton>

                ""
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvatarChanging;
