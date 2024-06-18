import { Banner } from "./banner";
import { IpadScroll } from "./ipad-scroll";
import { Production } from "./production";

export const Body = () => {
  return (
    <div className="w-full">
      <Banner />
      <IpadScroll />
      <Production />
    </div>
  );
};
