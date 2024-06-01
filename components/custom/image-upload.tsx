"use client";

import {
  AudioWaveform,
  File,
  FileImage,
  FolderArchive,
  UploadCloud,
  Video,
  X,
} from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";

interface ImageUploadProps {
  setUploadFile: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function ImageUpload({ setUploadFile }: ImageUploadProps) {
  // const onDrop = useCallback(async (acceptedFiles: File[]) => {
  //   setFilesToUpload((prevUploadProgress) => {
  //     return [
  //       ...prevUploadProgress,
  //       ...acceptedFiles.map((file) => {
  //         return {
  //           progress: 0,
  //           File: file,
  //           source: null,
  //         };
  //       }),
  //     ];
  //   });

  //   // cloudinary upload

  //   // const fileUploadBatch = acceptedFiles.map((file) => {
  //   //   const formData = new FormData();
  //   //   formData.append("file", file);
  //   //   formData.append(
  //   //     "upload_preset",
  //   //     process.env.NEXT_PUBLIC_UPLOAD_PRESET as string
  //   //   );

  //   //   const cancelSource = axios.CancelToken.source();
  //   //   return uploadImageToCloudinary(
  //   //     formData,
  //   //     (progressEvent) => onUploadProgress(progressEvent, file, cancelSource),
  //   //     cancelSource
  //   //   );
  //   // });

  //   // try {
  //   //   await Promise.all(fileUploadBatch);
  //   //   alert("All files uploaded successfully");
  //   // } catch (error) {
  //   //   console.error("Error uploading files: ", error);
  //   // }
  // }, []);

  // const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div>
        <label
          // {...getRootProps()}
          className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-secondary dark:bg-[#a8b3cf14]/[0.2] "
        >
          <div className=" text-center">
            <div className=" border p-2 rounded-md max-w-min mx-auto">
              <UploadCloud size={20} />
            </div>

            <p className="mt-2 text-sm  ">
              <span className="font-semibold">Drag files</span>
            </p>
            <p className="text-xs ">
              Click to upload files &#40;files should be under 10 MB &#41;
            </p>
          </div>
        </label>
        <Input
          // {...getInputProps()}
          id="dropzone-file"
          accept="image/png, image/jpeg"
          type="file"
          className="hidden"
        />
      </div>
    </div>
  );
}
