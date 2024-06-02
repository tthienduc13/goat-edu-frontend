import { UserAvatar } from "@/components/custom/user-avatar";
import { useCurrentUser } from "@/hooks/use-current-user";

interface UserItemProps {
  isOpen: boolean;
}

export const UserItem = ({ isOpen }: UserItemProps) => {
  const user = useCurrentUser();
  return (
    <div className="w-full flex items-center justify-center py-4 border-b-[1px]">
      <UserAvatar shape="square" />
      {isOpen && (
        <div className="flex flex-col ml-3 justify-between  w-full">
          <span className="text-sm text-muted-foreground">Hello 👋</span>
          <div className="text-base font-semibold">{user?.name}</div>
        </div>
      )}
    </div>
  );
};
