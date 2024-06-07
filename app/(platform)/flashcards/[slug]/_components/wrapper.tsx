import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface WrapperProps {
  children: React.ReactNode;
  headerTitle: string;
  headerStar?: number;
}

export const Wrapper = ({
  children,
  headerTitle,
  headerStar,
}: WrapperProps) => {
  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader>
        <div className="flex flex-col gap-y-4">
          <span className="text-3xl font-bold">{headerTitle}</span>
          {headerStar && (
            <div className="flex flex-row items-center gap-x-2">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span>{headerStar}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
