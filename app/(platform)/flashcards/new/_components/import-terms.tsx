import { Layers } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export const ImportTerms = () => {
  const [value, setValue] = useState("");

  const [_termDelimiter, setTermDelimiter] = useState("\\t");
  const [_cardDelimiter, setCardDelimiter] = useState("\\n");
  const td = _termDelimiter.replace(/\\t/g, "\t").replace(/\\n/g, "\n");
  const cd = _cardDelimiter.replace(/\\t/g, "\t").replace(/\\n/g, "\n");

  const generatePlaceholder = () => {
    return Array.from({ length: 3 })
      .map((_, i) => `Term ${i + 1}${td}Definition ${i + 1}`)
      .join(cd);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Layers className="-rotate-90 w-4 h-4 mr-2" />
          <span>Import terms</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[700px]">
        <DialogTitle className="text-xl">Import terms</DialogTitle>
        <div className="w-full"></div>
      </DialogContent>
    </Dialog>
  );
};
