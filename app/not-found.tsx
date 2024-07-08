"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
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
        <div className="text-2xl font-bold">404 - page not found</div>
        <div className="w-[400px] text-sm font-light text-center">
          The page you are looking for might have been removed had it&apos;s
          name changed or is temporarily unavailable.
        </div>
      </div>
      <Button variant="link" onClick={goBack}>
        Back to previous
      </Button>
    </div>
  );
}
