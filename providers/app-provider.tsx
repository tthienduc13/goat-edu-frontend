import { ReactQueryProvider } from "./react-query-provider";
import { ThemeProvider } from "./theme-provider";

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <ReactQueryProvider>{children}</ReactQueryProvider>
  </ThemeProvider>;
};
