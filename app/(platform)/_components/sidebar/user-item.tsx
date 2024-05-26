import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserItemProps {
  isOpen: boolean;
}

export const UserItem = ({ isOpen }: UserItemProps) => {
  return (
    <div className="w-full flex items-center justify-center py-4 border-b-[1px]">
      <Avatar className="rounded-md">
        <AvatarImage
        // src={user?.image!}
        />
        <AvatarFallback className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[#fc538d]  to-[#ce3df3]">
          GE
        </AvatarFallback>
      </Avatar>
      {isOpen && (
        <div className="flex flex-col ml-3 justify-between  w-full">
          <span className="text-sm text-muted-foreground">Hello 👋</span>
          <div className="text-base font-semibold">Thien Duc</div>
        </div>
      )}
    </div>
  );
};
