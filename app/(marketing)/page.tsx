import { Metadata } from "next";
import { Body } from "@/app/(marketing)/_components/content/body";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return <Body />;
}
