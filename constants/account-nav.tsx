import { CreditCard, User, Users } from "lucide-react";

export const AccountNav = [
  {
    title: "Profile",
    href: "/account/profile",
    symbol: <User className="h-6 w-6" />,
  },
  {
    title: "Billing & Subcription",
    href: "/account/billing",
    symbol: <CreditCard className="h-6 w-6" />,
  },
  {
    title: "Invite",
    href: "/account/invite",
    symbol: <Users className="h-6 w-6" />,
  },
];
