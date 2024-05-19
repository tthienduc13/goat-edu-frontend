import { SiteFooter } from "./site-footer";
import { SocialNetwork } from "./social-network";

export const Footer = () => {
  return (
    <div className="footer pt-16 border-t-[0.8px] border-slate-400">
      <SiteFooter />
      <SocialNetwork />
    </div>
  );
};
