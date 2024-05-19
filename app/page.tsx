"use client";
import { Header } from "@/components/landing/header";
import { Body } from "@/components/landing/body";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className=" bg-[#0F172A] text-white">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}
