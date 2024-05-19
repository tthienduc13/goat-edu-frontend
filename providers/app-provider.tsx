import { ReactQueryProvider } from "./react-query-provider";
import SessionProviderApp from "./session-proivder";
import { ThemeProvider } from "./theme-provider";

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  <SessionProviderApp>
    <ReactQueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ReactQueryProvider>
  </SessionProviderApp>;
};
