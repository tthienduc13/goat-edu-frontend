import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RelatedCard } from "./related-card";

export const relatedData = [{}];

export const Realted = () => {
  return (
    <Card className="w-full shadow-none">
      <CardHeader>
        <div className="text-sm text-muted-foreground">
          Related to this discussion
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-1 divide-y-[1px]">
        {/* <RelatedCard /> */}
      </CardContent>
    </Card>
  );
};
