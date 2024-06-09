import { Body } from "@/components/landing/body";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return <Body />;
}
