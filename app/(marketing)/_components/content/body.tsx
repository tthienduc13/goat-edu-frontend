import dynamic from "next/dynamic";
import { Banner } from "./banner";
// import { IpadScroll } from "./ipad-scroll";
import { Production } from "./production";

const DynamicIpadScroll = dynamic(() =>
  import("./ipad-scroll").then((res) => res.IpadScroll)
);

export const Body = () => {
  return (
    <div className="w-full">
      <Banner />
      <DynamicIpadScroll />
      <Production />
    </div>
  );
};
