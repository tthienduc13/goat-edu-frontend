"use client";

import { Header } from "./header";
import { useState } from "react";
import Image from "next/image";

import EditIconAnimate from "@/assets/gif/edit.gif";
import EditIconPause from "@/assets/gif/edit_pause.png";

export const AccountPassword = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const handleEditClick = () => {
    setIsEdit(!isEdit);
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
      <div>Change password form here</div>
    </div>
  );
};
