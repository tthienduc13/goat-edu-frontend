import { auth, signOut } from "@/auth";

const BrowsePage = async () => {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session?.user)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
};

export default BrowsePage;
