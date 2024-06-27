import Link from "next/link";
import Image from "next/image";

import EmptyDiscussion from "@/public/icons/empty/empty-discussion.svg";
import { Button } from "@/components/ui/button";

export const DiscussionsContent = () => {
  // if (data?.length == 0) {
  return (
    <div className=" h-[500px] flex flex-col justify-center items-center gap-y-10">
      <Image src={EmptyDiscussion} alt="logo" width={350} />
      <Link href={""}>
        <Button size={"lg"}>Create your first discussion</Button>
      </Link>
    </div>
  );
  // }
  return (
    <>
      <div>Discussions Content content</div>
    </>
  );
};
