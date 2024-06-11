import { useCurrentUser } from "@/hooks/use-current-user";

import { UserAvatar } from "@/components/custom/user-avatar";

export const UserItem = () => {
  const user = useCurrentUser();
  return (
    <div className="w-full flex items-center justify-center pt-4 ">
      <UserAvatar shape="square" />

      <div className="flex flex-col ml-3 justify-between  w-full">
        <span className="text-sm text-muted-foreground">Hello 👋</span>
        <div className="text-base font-semibold">{user?.name}</div>
      </div>
    </div>
  );
};
