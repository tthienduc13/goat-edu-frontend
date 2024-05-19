import { auth, signOut } from "@/auth";

const BrowsePage = async () => {
  const session = await auth();
  return (
    <div className="h-full w-full p-10">
      {JSON.stringify(session?.user)}
      <form
        className="text-white"
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
