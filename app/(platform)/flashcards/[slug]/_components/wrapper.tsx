import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { MutableRefObject } from "react";

interface WrapperProps {
  children: React.ReactNode;
  headerTitle: string;
  headerDes?: string;
  headerStar?: number;
}

export const Wrapper = ({
  children,
  headerTitle,
  headerDes,
  headerStar,
}: WrapperProps) => {
  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader id="onborda-step1" className="max-w-1/2">
        <div className="flex flex-col gap-y-4">
          <div className="w-full flex flex-row justify-between items-center">
            <div className="text-3xl font-bold">{headerTitle}</div>
            <div
              id="onborda-step2"
              className="flex flex-row items-center gap-x-2"
            >
              <div>
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              </div>
              <span>{headerStar}</span>
            </div>
          </div>
          <div className="text-sm font-light text-muted-foreground">
            {headerDes}
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
