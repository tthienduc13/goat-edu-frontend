import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { MutableRefObject } from "react";

interface WrapperProps {
  children: React.ReactNode;
  headerTitle: string;
  titleRef?: MutableRefObject<null>;
  headerDes?: string;
  descriptionRef?: MutableRefObject<null>;
  headerStar?: number;
  starRef?: MutableRefObject<null>;
}

export const Wrapper = ({
  children,
  headerTitle,
  titleRef,
  headerDes,
  descriptionRef,
  headerStar,
  starRef,
}: WrapperProps) => {
  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="max-w-1/2">
        <div className="flex flex-col gap-y-4">
          <div className="w-full flex flex-row justify-between items-center">
            <div ref={titleRef} className="text-3xl font-bold">
              {headerTitle}
            </div>
            <div className="flex flex-row items-center gap-x-2">
              <div ref={starRef}>
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              </div>
              <span>{headerStar}</span>
            </div>
          </div>
          <div
            ref={descriptionRef}
            className="text-sm font-light text-muted-foreground"
          >
            {headerDes}
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
