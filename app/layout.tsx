import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { cookies } from "next/headers";

import { AppThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import { Loading } from "@/components/auth/loading";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(`https://goatedu.vercel.app`),
  title: {
    default: "GoatEdu - No.1 learning platform",
    template: "%s | GoatEdu - No.1 learning platform",
  },
  description:
    "GoatEdu offers professional site for all students around the world in general and students in Vietnam in specific to pass the National Highschool Exam.",
  openGraph: {
    title: "GoatEdu - No.1 learning platform",
    description:
      "GoatEdu offers professional site for all students around the world in general and students in Vietnam in specific to pass the National Highschool Exam.",
    type: "website",
    url: process.env.NEXT_PUBLIC_URL,
    locale: "vi_VN",
    siteName: "GoatEdu",
  },
  icons: {
    icon: "/logo.png",
  },
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
              {children}
              <Toaster position="bottom-right" richColors={false} />
              <SpeedInsights />
            </AppThemeProvider>
          </ReactQueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
