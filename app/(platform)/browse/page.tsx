"use client";

import { Logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSession } from "next-auth/react";

const BrowsePage = () => {
  return (
    <div className="h-full w-full p-10">
      <button onClick={() => alert("alll")} type="submit">
        alert
      </button>
    </div>
  );
};

export default BrowsePage;
