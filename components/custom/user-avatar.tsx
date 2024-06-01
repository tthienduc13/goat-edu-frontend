import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarProps {
  imageUrl?: string;
  shape: "square" | "circle";
}
export const UserAvatar = ({ imageUrl, shape }: AvatarProps) => {
  return (
    <Avatar className={cn(shape === "square" ? "rounded-md" : "rounded-full")}>
      <AvatarImage src={imageUrl} />
      <AvatarFallback className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[#fc538d]  to-[#ce3df3]">
        GE
      </AvatarFallback>
    </Avatar>
  );
};
