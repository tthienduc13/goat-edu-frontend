import React from "react";
import Image from "next/image";

interface IProps {
  fileStorage: File | null;
}

function FilePreview({ fileStorage }: IProps) {
  if (!fileStorage) {
    return <div>No file selected.</div>;
  }

  if (fileStorage.type.includes("video/")) {
    return (
      <video
        className="object-contain w-full h-48"
        src={URL.createObjectURL(fileStorage)}
        controls
      />
    );
  } else {
    return (
      <Image
        className="object-contain "
        width={6000}
        height={4000}
        src={URL.createObjectURL(fileStorage)}
        alt="Preview"
      />
    );
  }
}

export default FilePreview;
