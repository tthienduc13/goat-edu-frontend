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
import { AccountPassword } from "../_components/account-password";

const ProfilePage = () => {
  return (
    <Wrapper title="Profile">
      <div className="flex flex-col h-full overflow-y-scroll no-scrollbar w-full gap-y-10">
        <AvatarChanging />
        <AccountInformation />
        <AccountPassword />
      </div>
    </Wrapper>
  );
};

export default ProfilePage;
