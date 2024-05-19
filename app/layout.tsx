import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import SessionProviderApp from "@/providers/session-proivder";
import { cookies } from "next/headers";
import dynamic from "next/dynamic";
import { Toaster } from "sonner";

const AppThemeProvider = dynamic(() => import("@/providers/theme-provider"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = cookies().get("__theme__")?.value || "dark";

  return (
    <html lang="en" style={theme !== "system" ? { colorScheme: theme } : {}}>
      <body className={inter.className}>
        <SessionProviderApp>
          <ReactQueryProvider>
            <AppThemeProvider
              attribute="class"
              defaultTheme={theme}
              enableSystem
            >
              {children}
              <Toaster position="bottom-left" />
            </AppThemeProvider>
          </ReactQueryProvider>
        </SessionProviderApp>
      </body>
    </html>
  );
}
