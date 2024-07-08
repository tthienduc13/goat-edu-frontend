"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <div className="h-screen w-full flex-col flex gap-y-4 items-center justify-center">
      <h1 className="text-transparent bg-clip-text font-bold bg-gradient-to-r from-[#fc538d]  to-[#ce3df3] text-9xl">
        Oops!
      </h1>
      <div className="flex flex-col gap-y-2 items-center justify-center">
        <div className="text-2xl font-bold">500 - Internal server error</div>
        <div className="w-[400px] text-sm font-light text-center text-balance">
          We are very sorry, it seems a problem with our servers. Not really a
          reason to celebrate, but our developers are already working hard to
          repair it. Please try again in a few momnets. If you notice the
          problem persists, please report it to{" "}
          <span className="text-blue-500">support@goat.edu</span>
        </div>
      </div>
      <Button variant="link" onClick={goBack}>
        Back to previous
      </Button>
    </div>
  );
}
