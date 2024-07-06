import { SiteFooter } from "./site-footer";
import { SocialNetwork } from "./social-network";

export const Footer = () => {
  return (
    <div className="max-w-[1440px] px-5 sm:px-10 w-full mx-auto">
      <SiteFooter />
      <SocialNetwork />
    </div>
  );
};
