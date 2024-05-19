import { Banner } from "./banner";
import { IpadScroll } from "./ipad-scroll";
import { Stickyscroll } from "./sticky-scroll";

export const Body = () => {
  return (
    <div className="body bg-transparent">
      <Banner />
      <IpadScroll />
      <Stickyscroll />
    </div>
  );
};
