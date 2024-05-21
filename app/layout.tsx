import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { SessionProvider } from "next-auth/react";
import { cookies } from "next/headers";

import { AppThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import { Loading } from "@/components/auth/loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = cookies().get("__theme__")?.value || "dark";

  return (
    <html lang="en" style={theme !== "system" ? { colorScheme: theme } : {}}>
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <ReactQueryProvider>
            <AppThemeProvider
              attribute="class"
              defaultTheme={theme}
              enableSystem
            >
              {children}
              <Toaster position="bottom-left" richColors={true} />
            </AppThemeProvider>
          </ReactQueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
