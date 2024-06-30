"use client";
import { notFound, useRouter } from "next/navigation";
import { OnboardingIntro } from "./_components/onboarding-intro";
import { OnboardingTheme } from "./_components/onboarding-theme";
import { useSearchParams } from "next/navigation";
import { OnboardingDone } from "./_components/onboarding-done";
import { OnboardingRole } from "./_components/onboarding-role";
import { OnboardingCommand } from "./_components/onboarding-command";
import { OnboardingUser } from "./_components/command-user";

const OnboardingPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const page = params.get("page");

  const query = ["intro", "theme", "done", "role", "command", "user"];

  if (!page || !query.includes(page)) {
    notFound();
    return null;
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center max-w-3xl mx-auto overflow-x-hidden">
      {page === "intro" && <OnboardingIntro />}
      {page === "theme" && <OnboardingTheme />}
      {page === "user" && <OnboardingUser />}
      {page === "role" && <OnboardingRole />}
      {page === "command" && <OnboardingCommand />}
      {page === "done" && <OnboardingDone />}
    </div>
  );
};

export default OnboardingPage;
