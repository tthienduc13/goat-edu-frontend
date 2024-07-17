import Image from "next/image";
import EmptyTheory from "@/public/icons/empty/empty-theory.svg";
const Empty = () => {
  return (
    <div className="flex-1 mt-10 h-full flex flex-col justify-center items-center">
      <div className="h-[300px] w-full relative">
        <Image src={EmptyTheory} alt="empty study" fill />
      </div>
      <h2 className="text-lg">Oops...It looks like there is no content here</h2>
    </div>
  );
};

export default Empty;
