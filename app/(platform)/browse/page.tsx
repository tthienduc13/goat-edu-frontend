"use client";

import { toast } from "sonner";

const BrowsePage = () => {
  return (
    <div className="h-full w-full p-10">
      <button onClick={() => toast.success("aaa")} type="submit">
        alert
      </button>
    </div>
  );
};

export default BrowsePage;
