import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import "@smastrom/react-rating/style.css";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { cookies } from "next/headers";

import { AppThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Loading } from "@/components/auth/loading";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

import "katex/dist/katex.min.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.goatedu.tech"),
  title: {
    default: "GoatEdu - No.1 Learning Platform Built For Generations",
    template: "%s | GoatEdu - No.1 Learning Platform Built For Generations",
  },
  description:
    "GoatEdu offers a comprehensive and professional educational platform for students globally, with a special emphasis on helping students in Vietnam excel in the National High School Exam. Access expert guidance, practice tests, and tailored learning resources to achieve academic success.",
  openGraph: {
    images: [
      {
        width: 1200,
        height: 630,
        url: "/images/opengraph-image.jpg",
      },
    ],
    title: " GoatEdu - No.1 Learning Platform Built For Generations",
    description:
      "GoatEdu is a leading educational platform dedicated to helping students worldwide, with a special focus on students in Vietnam, succeed in their academic pursuits. Our comprehensive resources and expert guidance are tailored to support students in preparing for the National High School Exam, ensuring they achieve their highest potential. Discover professional courses, practice tests, and personalized learning tools designed to make exam preparation effective and accessible for every student.",
    type: "website",
    url: process.env.NEXT_PUBLIC_URL || "https://www.goatedu.tech",
    locale: "vi_VN",
    siteName: "GoatEdu",
  },
  icons: {
    icon: "/logo.png",
  },
  twitter: {
    card: "summary_large_image",
    site: "@GoatEdu",
    title: " GoatEdu - No.1 Learning Platform Built For Generations",
    description:
      "Welcome to GoatEdu, the leading educational platform for students worldwide. Explore our expert guidance and resources to achieve academic excellence.",
    images: "https://www.goatedu.tech/images/screenshot.jpeg",
  },
  keywords: [
    "goatedu",
    "GoatEdu",
    "goat",
    "edu",
    "flaschard",
    "discussion",
    "discussed",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = cookies().get("__theme__")?.value || "light";

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
