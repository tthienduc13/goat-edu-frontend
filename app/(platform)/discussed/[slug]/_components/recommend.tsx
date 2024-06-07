import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export const Recommend = () => {
  const pathName = usePathname();

  const handleCopy = () => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}${pathName}`);
    toast.success("Url copied to clipboard!");
  };
  return (
    <Card className="w-full shadow-none">
      <CardHeader>
        <div className="text-sm text-muted-foreground">
          Would you recommend this post?
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-1">
          <Button onClick={handleCopy} variant="ghost" size="icon">
            <Copy className="w-4 h-4" />
          </Button>
          <span className="text-xs text-muted-foreground">Copy</span>
        </div>
      </CardContent>
    </Card>
  );
};
