import { Logo } from "@/components/custom/logo";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import useCommandStore from "@/stores/useCommandStore";

export const Footer = () => {
  const { setIsOpenCommandMenu } = useCommandStore();
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <div className="w-full py-5 md:py-10 flex flex-row items-center border-t-[1px] justify-between">
      {!isMobile && (
        <div className=" hidden md:flex flex-row gap-x-5 items-center">
          <Logo size="lg" />
          <div className="text-sm text-muted-foreground">© 2024, Inc.</div>
        </div>
      )}
      <Button onClick={() => setIsOpenCommandMenu(true)} variant={"custom"}>
        Command menu ⌘ + K
      </Button>
    </div>
  );
};
