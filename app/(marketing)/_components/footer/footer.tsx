import { SiteFooter } from "./site-footer";
import { SocialNetwork } from "./social-network";

export const Footer = () => {
  return (
    <div className="max-w-[1320px] mx-auto">
      <SiteFooter />
      <SocialNetwork />
    </div>
  );
};
