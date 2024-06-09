import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { cookies } from "next/headers";

import { AppThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import { Loading } from "@/components/auth/loading";
import { TooltipProvider } from "@/components/plate-ui/tooltip";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "GoatEdu",
    template: "%s | GoatEdu",
  },
  description:
    "Welcome to GoatEdu, No.1 learning platform for National highschool exam",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = cookies().get("__theme__")?.value || "dark";

  return (
    <html
      lang="en"
      style={theme !== "system" ? { colorScheme: theme } : {}}
      suppressHydrationWarning={true}
    >
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <ReactQueryProvider>
            <AppThemeProvider
              attribute="class"
              defaultTheme={theme}
              enableSystem
            >
              <TooltipProvider>{children}</TooltipProvider>
              <Toaster position="bottom-right" richColors={false} />
              <SpeedInsights />
            </AppThemeProvider>
          </ReactQueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
