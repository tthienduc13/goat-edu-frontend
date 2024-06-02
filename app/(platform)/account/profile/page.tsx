import { InputField } from "@/components/custom/input-field";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { currentUser } from "@/lib/auth";
import { ChevronRight, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Wrapper } from "../_components/wrapper";
import { AvatarChanging } from "../_components/avatar-changing";
import { AccountInformation } from "../_components/account-information";

const ProfilePage = () => {
  return (
    // <div className="flex flex-col space-y-5 w-[700px] overflow-y-scroll px-10 py-10 border-x-[0.8px]">
    //   <h3 className="text-2xl font-bold tracking-tight">Profile</h3>
    //   <h4 className="text-lg font-bold tracking-tight">Profile picture</h4>
    //   <p>
    //     Upload a picture to make your profile distinctive and help others easily
    //     recognize your comments and contributions!
    //   </p>
    //   <Avatar className="rounded-full w-[100px] h-[100px]">
    //     <AvatarImage
    //     // src={user?.image!}
    //     />
    //     <AvatarFallback className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[#fc538d]  to-[#ce3df3]">
    //       GE
    //     </AvatarFallback>
    //   </Avatar>
    //   <div></div>
    //   <h4 className="scroll-m-20 text-lg font-bold tracking-tight">
    //     Account information
    //   </h4>
    //   <p className="font-semibold">Full name :</p>
    //   <div className="fullname-change flex flex-row space-x-2">
    //     <input
    //       type="text"
    //       className="w-[400px] h-[46.4px]"
    //       placeholder="Full name"
    //     ></input>
    //     <Button className="h-[46.4px]">Save</Button>
    //   </div>
    //   <p className="font-semibold">Username :</p>
    //   <p>{user?.username}</p>
    //   <p className="font-semibold">Email :</p>
    //   <p>{userInformation.email}</p>
    //   <p className="font-semibold">Phone number :</p>
    //   <p>{userInformation.phonenumber}</p>
    //   <h4 className="scroll-m-20 text-lg font-bold tracking-tight">
    //     Subscription
    //   </h4>

    //   {/* {userInformation.subscription ? (
    //     <div className="flex flex-col space-y-5">
    //       <p>Subscription : {userInformation.subscription}</p>
    //       <p>
    //         Expired date : {userInformation.subscriptionend.toLocaleString()}
    //       </p>
    //     </div>
    //   ) : (
    //     <p>Have not had a subscription yet !</p>
    //   )} */}
    // </div>
    <Wrapper title="Profile">
      <div className="flex flex-col h-full w-full gap-y-10">
        <AvatarChanging />
        <AccountInformation />
      </div>
    </Wrapper>
  );
};

export default ProfilePage;
