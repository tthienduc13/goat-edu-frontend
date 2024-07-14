"use client";

import { cn } from "@/lib/utils";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";

import { Circle } from "lucide-react";

import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { EmptyNotification } from "./empty-notification";
import { NotificationLoading } from "./notification-loading";

import { useNotificationByUser } from "@/app/api/notification/notification.query";
import { toast } from "sonner";

export const NotificationList = () => {
  const user = useCurrentUser();

  const observer = useRef<IntersectionObserver>();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    refetch,
  } = useNotificationByUser(user?.token!);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  );

  const notifications = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      return [...acc, ...page];
    }, []);
  }, [data]);

  if (isLoading) {
    return <NotificationLoading />;
  }

  if (notifications?.length === 0) {
    return <EmptyNotification />;
  }

  if (error) {
    return;
  }

  const handleGetNoti = (mess: string) => {
    toast.success(mess);
    refetch();
  };

  return (
    <DropdownMenuGroup className="flex flex-col gap-y-2">
      {notifications &&
        notifications.map((item) => (
          <DropdownMenuItem
            className={cn("h-25 flex flex-row items-center")}
            key={item.id}
            ref={lastElementRef}
          >
            <div className="flex flex-col items-start flex-1 gap-y-1">
              <p className="notification-title text-base font-semibold tracking-tight">
                {item.notificationName}
              </p>
              <p className="notification-message">{item.notificationMessage}</p>
            </div>
            <div className="h-full">
              <Circle className="h-[10px] w-[10px] fill-blue-600 text-blue-500" />
            </div>
          </DropdownMenuItem>
        ))}
    </DropdownMenuGroup>
  );
};
