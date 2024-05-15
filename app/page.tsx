import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="header">
      <div className="logo text-black text-base font-semibold">GOAT.EDU</div>
      <div className="right nav bar">
        <h4 className="home ">Home</h4>
        <h4>
          Study tools <ChevronDown />
        </h4>
        <h4>
          Subject <ChevronDown />
        </h4>
      </div>
    </main>
  );
}
