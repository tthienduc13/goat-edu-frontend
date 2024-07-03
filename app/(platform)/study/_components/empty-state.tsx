import Image from "next/image";
import rocket from "@/assets/rocket.png";
const Empty = () => {
  return (
    <div className="w-full flex flex-col h-screen justify-center items-center space-y-4">
      <Image src={rocket} alt="empty" height={200} width={200} color=""></Image>

      <h3 className="font-medium">
        Sorry, there are no content for this lesson
      </h3>
    </div>
  );
};

export default Empty;
