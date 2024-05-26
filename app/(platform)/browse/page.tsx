"use client";

import { useKeyboardShortcut } from "@/hooks/use-shorcut-keyboard";

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
