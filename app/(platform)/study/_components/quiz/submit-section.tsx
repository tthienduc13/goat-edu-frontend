import Image from "next/image";
import done from "@/public/done.svg";
import { SubmitAlert } from "./submit-alert";
interface SubmitSectionProps {
  submitAnswer: () => void;
}

export const SubmitSection = ({ submitAnswer }: SubmitSectionProps) => {
  return (
    <div className="flex flex-col items-center gap-y-5 mt-8">
      <Image src={done} width={277} height={88} alt="img" />
      <div className="font-bold text-2xl">
        All done! Ready to submit your test?
      </div>
      <div>
        <SubmitAlert submitAnswer={submitAnswer} />
      </div>
    </div>
  );
};
