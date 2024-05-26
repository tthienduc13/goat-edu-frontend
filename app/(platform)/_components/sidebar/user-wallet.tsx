import { Wallet } from "lucide-react";

export const UserWallet = () => {
  return (
    <div className="flex items-center justify-between bg-muted p-2 rounded-md">
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground font-semibold">
          Wallet
        </span>
        <div>$99.99</div>
      </div>
      <div className="p-2 bg-muted-foreground rounded-md">
        <Wallet className="w-4 h-4" />
      </div>
    </div>
  );
};
