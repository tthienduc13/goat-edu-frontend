import { SiteFooter } from "./site-footer";
import { SocialNetwork } from "./social-network";

export const Footer = () => {
  return (
    <div className="max-w-[1440px] w-full mx-auto">
      <SiteFooter />
      <SocialNetwork />
    </div>
  );
};
