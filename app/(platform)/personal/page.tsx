"use client";
import dynamic from "next/dynamic";
import { useState, useRef, useEffect } from "react";

type Tab = "sets" | "discussions";

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

const PersonalPage = () => {
  const [tab, setTab] = useState<Tab>("sets");
  const setsTabRef = useRef<HTMLDivElement>(null);
  const discussionsTabRef = useRef<HTMLDivElement>(null);
  const [activeTabStyle, setActiveTabStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const updateActiveTabStyle = () => {
      const tabRef =
        tab === "sets" ? setsTabRef.current : discussionsTabRef.current;
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

  return (
    <div className="max-w-[1200px] w-full flex flex-col mx-auto">
      <div className="w-full relative">
        <div className="flex flex-row items-center gap-x-5 py-2 border-b-[2px]">
          <div
            ref={setsTabRef}
            onClick={() => setTab("sets")}
            className={`cursor-pointer ${tab === "sets" ? "font-bold " : ""}`}
          >
            Study sets
          </div>
          <div
            ref={discussionsTabRef}
            onClick={() => setTab("discussions")}
            className={`cursor-pointer ${
              tab === "discussions" ? "font-bold" : ""
            }`}
          >
            Discussions
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
      </div>
    </div>
  );
};

export default PersonalPage;
