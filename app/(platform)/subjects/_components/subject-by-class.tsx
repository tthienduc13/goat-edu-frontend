import { Badge } from "@/components/ui/badge";
import { Subject } from "@/types/subject";
import Link from "next/link";

interface SubjectByClassProps {
  data: Subject;
}

export const SubjectByClass = ({ data }: SubjectByClassProps) => {
  return (
    <div className="flex flex-col justify-center">
      <Link key={data.id} href={`/subject/${data.id}`}>
        <img
          src={data.image}
          width={248}
          height={150}
          alt="Subject Image"
          className="rounded-2xl shadow-xl"
        />
      </Link>
      <div className="mt-4">
        <Badge variant="secondary">{data.subjectCode}</Badge>
      </div>
      <p className="font-semibold mt-2 text-xs">date month year</p>
      <h4 className=" text-lg mt-4 font-semibold tracking-tight">
        {data.subjectName}
      </h4>
      <p className="font-medium mt-3 h-[100px] text-xs">{data.information}</p>
      <div className="mt-3">
        <Link key={data.id} href={`/subjects/${data.id}`}>
          <Badge variant="secondary">Enroll</Badge>
        </Link>
      </div>
    </div>
  );
};
