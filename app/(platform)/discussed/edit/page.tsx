import { currentUser } from "@/lib/auth";
import { EditDiscussionForm } from "./_components/edit-discussion-form";

const EditDiscussionPage = async () => {
  const user = await currentUser();
  return <EditDiscussionForm token={user?.token!} userId={user?.id!} />;
};

export default EditDiscussionPage;
