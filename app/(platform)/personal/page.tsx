"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";

type Tab = "sets" | "discussions" | "courses";

const DynamicStudySets = dynamic(
  () =>
    import("./_components/study-set-content").then(
      (res) => res.StudySetContent
    ),
  {
    ssr: false,
  }
);

const DynamicDiscussions = dynamic(
  () =>
    import("./_components/discussions-content").then(
      (res) => res.DiscussionsContent
    ),
  {
    ssr: false,
  }
);

const DynamicCourses = dynamic(
  () =>
    import("./_components/courses-content").then((res) => res.CoursesContent),
  {
    ssr: false,
  }
);

const PersonalPage = () => {
  const searchParams = useSearchParams();
  const user = useCurrentUser();

  const [tab, setTab] = useState<Tab>("sets");
  const setsTabRef = useRef<HTMLDivElement>(null);
  const discussionsTabRef = useRef<HTMLDivElement>(null);
  const coursesTabRef = useRef<HTMLDivElement>(null);
  const [activeTabStyle, setActiveTabStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const updateActiveTabStyle = () => {
      const tabRef =
        tab === "sets"
          ? setsTabRef.current
          : tab === "discussions"
          ? discussionsTabRef.current
          : coursesTabRef.current;
      if (tabRef) {
        setActiveTabStyle({
          width: tabRef.clientWidth,
          left: tabRef.offsetLeft,
        });
      }
    };
    updateActiveTabStyle();
    window.addEventListener("resize", updateActiveTabStyle);
    return () => window.removeEventListener("resize", updateActiveTabStyle);
  }, [tab]);

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (
      tabParam === "sets" ||
      tabParam === "discussions" ||
      tabParam === "courses"
    ) {
      setTab(tabParam as Tab);
    }
  }, [searchParams]);

  const handleTabChange = (newTab: Tab) => {
    setTab(newTab);
    const params = new URLSearchParams(window.location.search);
    params.set("tab", newTab);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };

  return (
    <div className="max-w-[1200px] w-full flex flex-col mx-auto">
      <div className="py-5 w-full flex flex-row gap-x-5 items-center">
        <div className=" relative h-20 w-20 rounded-full overflow-hidden">
          <Image
            src={user?.image ?? ""}
            alt="user image"
            fill
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="text-2xl font-semibold">{user?.name}</div>
          <div className="text-muted-foreground font-medium">
            @{user?.username}
          </div>
        </div>
      </div>
      <div className="w-full relative">
        <div className="flex flex-row items-center gap-x-5 py-2 border-b-[2px]">
          <div
            ref={setsTabRef}
            onClick={() => handleTabChange("sets")}
            className={`cursor-pointer ${tab === "sets" ? "font-bold " : ""}`}
          >
            Study sets
          </div>
          <div
            ref={discussionsTabRef}
            onClick={() => handleTabChange("discussions")}
            className={`cursor-pointer ${
              tab === "discussions" ? "font-bold" : ""
            }`}
          >
            Discussions
          </div>
          <div
            ref={coursesTabRef}
            onClick={() => handleTabChange("courses")}
            className={`cursor-pointer ${tab === "courses" ? "font-bold" : ""}`}
          >
            Courses
          </div>
        </div>

        <div
          className="absolute bottom-0 h-[2px] bg-black transition-all duration-300"
          style={activeTabStyle}
        />
      </div>
      <div className="py-10">
        {tab === "sets" && <DynamicStudySets />}
        {tab === "discussions" && <DynamicDiscussions />}
        {tab === "courses" && <DynamicCourses />}
      </div>
    </div>
  );
};

export default PersonalPage;
