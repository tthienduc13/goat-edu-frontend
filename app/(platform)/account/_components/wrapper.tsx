import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface WrapperProps {
  children: React.ReactNode;
  title: string;
  headerTitle?: string;
  headerLabel?: string;
}

export const Wrapper = ({ children, title }: WrapperProps) => {
  return (
    <div className="w-[700px] border-x-[0.8px]">
      <Card className="w-full border-none shadow-none bg-transparent h-full overflow-y-scroll flex flex-col gap-y-5">
        <CardHeader className="text-xl font-bold border-b-[0.8px]">
          {title}
        </CardHeader>
        <CardContent className="flex flex-col w-full self-center flex-1 pb-2 ">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};
