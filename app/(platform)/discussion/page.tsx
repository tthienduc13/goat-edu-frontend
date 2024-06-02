import { auth } from "@/auth";
import { useCurrentRole } from "@/hooks/use-current-role";
import { useCurrentUser } from "@/hooks/use-current-user";
import { currentUser } from "@/lib/auth";

export default async function DiscussionPage() {
  const currentUserNow = await currentUser();

  return (
    <div>
      {JSON.stringify(currentUserNow)}
      {/* {JSON.stringify(currentRole)} */}
    </div>
  );
}
