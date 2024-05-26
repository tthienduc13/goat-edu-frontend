"use client";

import { InputField } from "@/components/input-field";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ProfilePage = () => {
  const userInformation = {
    fullname: "Nguyễn Quốc Lâm",
    username: "No1SouthSide",
    image: "image",
    email: "nguyenquoclam@gmail.com",
    phonenumber: "1234567890",
    subscription: "Goatedu VIP",
    subscriptionend: new Date("2024-09-30T09:40:00Z"),
  };

  // update fullname
  const [fullname, setFullname] = useState(userInformation.fullname);

  const fullnameChange = (event: any) => {
    setFullname(event.target.value);
  };

  return (
    <div className="flex flex-row mx-auto w-full">
      <div className="w-[300px] ml-[150px] flex flex-col px-6 pt-6 border-[0.8px] border-r-0">
        <Button variant="secondary" className="p-6 rounded-2xl justify-start">
          <Link className="w-full" href="/account/profile">
            <div className=" flex flex-row justify-between">
              <div className="flex flex-row space-x-2 items-center">
                <Avatar className="rounded-full h-6 w-6">
                  <AvatarImage
                  // src={user?.image!}
                  />
                  <AvatarFallback className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[#fc538d]  to-[#ce3df3]">
                    GE
                  </AvatarFallback>
                </Avatar>
                <p className="ml-2">Profile</p>
              </div>
              <ChevronRight />
            </div>
          </Link>
        </Button>
        <Button variant="ghost" className="p-6 rounded-2xl justify-start">
          <Link className="w-full" href="/account/invite">
            <div className=" flex flex-row justify-between">
              <div className="flex flex-row space-x-2 items-center">
                <Users />
                <p className="ml-2">Invite friends</p>
              </div>
              <ChevronRight />
            </div>
          </Link>
        </Button>
      </div>
      <div className="edit-profile-form flex flex-col space-y-5 w-[700px] h-[700px] overflow-y-scroll px-10 py-10 border-[0.8px]">
        <h3 className="scroll-m-20 text-2xl font-bold tracking-tight">
          Profile
        </h3>
        <h4 className="scroll-m-20 text-lg font-bold tracking-tight">
          Profile picture
        </h4>
        <p>
          Upload a picture to make your profile distinctive and help others
          easily recognize your comments and contributions!
        </p>
        <Avatar className="rounded-full w-[100px] h-[100px]">
          <AvatarImage
          // src={user?.image!}
          />
          <AvatarFallback className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[#fc538d]  to-[#ce3df3]">
            GE
          </AvatarFallback>
        </Avatar>
        <div></div>
        <h4 className="scroll-m-20 text-lg font-bold tracking-tight">
          Account information
        </h4>
        <p className="font-semibold">Full name :</p>
        <div className="fullname-change flex flex-row space-x-2">
          <input
            type="text"
            className="w-[400px] h-[46.4px]"
            placeholder="Full name"
            value={fullname}
            onChange={fullnameChange}
          ></input>
          <Button className="h-[46.4px]">Save</Button>
        </div>
        <p className="font-semibold">Username :</p>
        <p>{userInformation.username}</p>
        <p className="font-semibold">Email :</p>
        <p>{userInformation.email}</p>
        <p className="font-semibold">Phone number :</p>
        <p>{userInformation.phonenumber}</p>
        <h4 className="scroll-m-20 text-lg font-bold tracking-tight">
          Subscription
        </h4>

        {userInformation.subscription != null ? (
          <div className="flex flex-col space-y-5">
            <p>Subscription : {userInformation.subscription}</p>
            <p>
              Expired date : {userInformation.subscriptionend.toLocaleString()}
            </p>
          </div>
        ) : (
          <p>Have not had a subscription yet !</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
