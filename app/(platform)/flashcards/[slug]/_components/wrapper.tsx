import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Star } from "./star-rating";
import { StarIcon } from "lucide-react";

interface WrapperProps {
  children: React.ReactNode;
  flashcardId?: string;
  headerTitle: string;
  headerDes?: string;
  headerStar?: number;
  withStar?: boolean;
  isRated?: boolean;
}

export const Wrapper = ({
  children,
  headerTitle,
  flashcardId,
  headerDes,
  headerStar,
  isRated,
  withStar = false,
}: WrapperProps) => {
  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader id="onborda-step1" className="max-w-1/2">
        <div className="flex flex-col gap-y-4">
          <div className="w-full flex flex-row justify-between items-center">
            <div className="text-3xl font-bold">{headerTitle}</div>
            {withStar && (
              <div
                id="onborda-step2"
                className="flex flex-row items-center gap-x-2"
              >
                {isRated ? (
                  <StarIcon className="h-4 w-4 text-[#FFB23F] fill-[#FFB23F]" />
                ) : (
                  <Star id={flashcardId!} />
                )}
                <span>{headerStar}</span>
              </div>
            )}
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
