import { Logout } from "@/actions/logout";
import { LogoutButton } from "@/components/auth/logout-button";
import { Logo } from "@/components/custom/logo";
import { UserAvatar } from "@/components/custom/user-avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useCurrentUser } from "@/hooks/use-current-user";
import useCreateDialogStore from "@/stores/useCreateDialogStore";
import usePlatformMobileNavStore from "@/stores/usePlatformMobileNavStore";
import useReportDialogStore from "@/stores/useReportDialogStore";
import {
  Bug,
  GalleryHorizontalEnd,
  Speech,
  Tablets,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const MobileNavbar = () => {
  const user = useCurrentUser();

  const router = useRouter();
  const pathName = usePathname();

  const { isPlatformOpenMobileNav, setIsPlatformOpenMobileNav } =
    usePlatformMobileNavStore();
  const { setIsOpenCreateDialog } = useCreateDialogStore();
  const { setIsOpenReportDialog } = useReportDialogStore();

  const handleCreateFlashcardSet = () => {
    setIsOpenCreateDialog(true);
    setIsPlatformOpenMobileNav(false);
  };

  const handleCreateDiscussion = () => {
    router.replace("/discussed/new");
    setIsPlatformOpenMobileNav(false);
  };

  const handleReport = () => {
    setIsOpenReportDialog(true);
    setIsPlatformOpenMobileNav(false);
  };

  const handleLogout = () => {
    Logout();
  };

  const UserSetting = [
    {
      name: "Profile",
      icon: User,
      href: "/account/profile",
      onclick: () => setIsPlatformOpenMobileNav(false),
    },
    {
      name: "Personal",
      icon: Tablets,
      href: "/personal",
      onclick: () => setIsPlatformOpenMobileNav(false),
    },
    {
      name: "Report",
      icon: Bug,
      href: "#",
      onclick: () => handleReport(),
    },
  ];

  const isActive = (href: string) => {
    if (href === "/browse" && pathName === "/browse") return true;
    if (
      href === "/create" &&
      (pathName === "/discussed/new" || pathName.includes("/flashcards/new"))
    ) {
      return true;
    }
    if (href === "/discussed" && pathName.includes("/discussed")) return true;
    if (href === "/subjects" && pathName.includes("/subjects")) return true;

    return false;
  };
  return (
    <Drawer
      direction="left"
      open={isPlatformOpenMobileNav}
      onOpenChange={setIsPlatformOpenMobileNav}
    >
      <DrawerContent className="w-full">
        <DrawerHeader className="flex items-center justify-between">
          <DrawerTitle>
            <Logo size="lg" />
          </DrawerTitle>
          <Button
            onClick={() => setIsPlatformOpenMobileNav(false)}
            variant={"ghost"}
            size={"icon"}
          >
            <X className="h-5 w-5" />
          </Button>
        </DrawerHeader>
        <div className="w-full flex flex-col gap-y-8 p-5">
          <div className="flex relative flex-col gap-y-5 border-b py-5">
            <div
              className="absolute w-1 rounded-r-[10px] -left-5  top-0 bg-violet-500 transition-all duration-300"
              style={{
                height: isActive("/browse")
                  ? "30px"
                  : isActive("/discussed")
                  ? "30px"
                  : isActive("/subjects")
                  ? "30px"
                  : isActive("/create")
                  ? "30px"
                  : "0",
                top: isActive("/browse")
                  ? "20px"
                  : isActive("/discussed")
                  ? "calc(28px + 1.25rem + 20px)"
                  : isActive("/subjects")
                  ? "calc(56px + 2.5rem + 20px)"
                  : isActive("/create")
                  ? "calc(84px + 3.75rem + 20px)"
                  : "0",
              }}
            />
            <Link
              onClick={() => setIsPlatformOpenMobileNav(false)}
              href={"/browse"}
              className=" text-lg font-semibold md:text-xl"
            >
              Home
            </Link>
            <Link
              onClick={() => setIsPlatformOpenMobileNav(false)}
              href={"/discussed"}
              className=" text-lg font-semibold md:text-xl "
            >
              Discussions
            </Link>
            <Link
              onClick={() => setIsPlatformOpenMobileNav(false)}
              href={"/subjects"}
              className=" text-lg font-semibold md:text-xl "
            >
              Courses
            </Link>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem className="border-b-0" value="item-1">
                <AccordionTrigger className="text-lg font-semibold md:text-xl p-0">
                  Create
                </AccordionTrigger>
                <AccordionContent>
                  <div className=" ml-3 py-5 flex flex-col gap-y-3 text-base font-semibold md:text-lg">
                    <div
                      onClick={handleCreateFlashcardSet}
                      className="flex flex-row items-center"
                    >
                      <GalleryHorizontalEnd className="mr-3 h-6 w-6" />
                      <span>Flashcard sets</span>
                    </div>
                    <div
                      onClick={handleCreateDiscussion}
                      className="flex flex-row items-center"
                    >
                      <Speech className="mr-3 h-6 w-6" />
                      <span>Discussion</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="flex flex-col gap-y-5 flex-1">
            <div className="flex flex-row items-center py-5 gap-x-4">
              <div className="h-12 w-12">
                <UserAvatar shape="square" />
              </div>
              <div className="flex flex-col ">
                <div className="text-lg font-semibold">Hello 👋</div>
                <div className="text-base font-medium">
                  {user?.name ?? "Not set yet"}
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-y-6">
              {UserSetting.map((item, index) => (
                <Link
                  key={index}
                  onClick={item.onclick}
                  href={item.href}
                  className=" flex flex-row  items-center  gap-x-2 text-lg font-medium md:text-xl"
                >
                  <item.icon className="w-6 h-6" />
                  <div>{item.name}</div>
                </Link>
              ))}
              <Button
                variant={"secondary"}
                onClick={handleLogout}
                className="w-full rounded-md"
              >
                Log out
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
