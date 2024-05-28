import { toast } from "sonner";

export const useCopyClipboard = (url: string) => {
  navigator.clipboard.writeText(url);
  return toast.success("Copy to clipboard");
};
