import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-center gap-x-10 p-24">
      <Logo size="lg" />
      <Hint label="To login page">
        <Link href="/auth/login">
          <Button>Login</Button>
        </Link>
      </Hint>
      <Hint label="To register page">
        <Link href="/auth/register">
          <Button>Create an account</Button>
        </Link>
      </Hint>
    </main>
  );
}
