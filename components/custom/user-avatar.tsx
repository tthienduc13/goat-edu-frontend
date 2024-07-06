import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";

interface AvatarProps {
  shape: "square" | "circle";
}
export const UserAvatar = ({ shape }: AvatarProps) => {
  const user = useCurrentUser();
  return (
    <Avatar
      className={cn(
        shape === "square" ? "rounded-md h-full w-full" : "rounded-full"
      )}
    >
      <AvatarImage className="object-cover" src={user?.image!} />
      <AvatarFallback className="w-full  h-full flex items-center justify-center bg-gradient-to-r from-[#fc538d]  to-[#ce3df3]">
        GE
      </AvatarFallback>
    </Avatar>
  );
};
