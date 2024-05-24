import { InputField } from "@/components/input-field";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const ProfilePage = () => {
  return (
    <div className="flex flex-row">
      <div className=""></div>
      <div className="edit-profile-form flex flex-col w-">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Edit profile
        </h3>
        <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
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
        <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
          Account information
        </h4>
        <input
          type="text"
          className="w-[400px] h-[46.4px]"
          placeholder="Full name"
        ></input>
        <h4 className="scroll-m-20 text-lg font-semibold tracking-tight"></h4>
      </div>
    </div>
  );
};

export default ProfilePage;
