import Image from "next/image";
import EmptyTheory from "@/public/icons/empty/empty-theory.svg";
const Empty = () => {
  return (
    <div className="w-full flex flex-col h-calc([100vh-80px-64px]) justify-center items-center space-y-4">
      <div className="w-full max-w-sm relative">
        <Image src={EmptyTheory} alt="empty" />
      </div>
      <div className=" font-medium mt-4">No content for this lesson</div>
    </div>
  );
};

export default Empty;
