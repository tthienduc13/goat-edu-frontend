import { ChakraProvider } from "@chakra-ui/react";

export function ChakraUiProvider({ children }: { children: React.ReactNode }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
