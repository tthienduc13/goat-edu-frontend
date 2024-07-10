import { Metadata } from "next";
import { Body } from "@/app/(marketing)/_components/content/body";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.goatedu.tech"),
  title: "Home",
  description:
    "Welcome to GoatEdu. Discover comprehensive resources and personalized learning tools to excel in academic pursuits prepare for National High School Exam.",
  openGraph: {
    images: [
      {
        width: 1200,
        height: 630,
        url: "https://www.goatedu.tech/images/opengraph-image.jpg",
      },
    ],
    title: "Home",
    description:
      "GoatEdu is a premier educational platform dedicated to supporting students globally, with a special emphasis on students in Vietnam. Access professional courses, practice tests, and tailored resources designed to help you succeed in the National High School Exam and other academic challenges.",
    type: "website",
    url: "https://www.goatedu.tech",
    locale: "vi_VN",
    siteName: "GoatEdu",
  },
  icons: {
    icon: "/logo.png",
  },
  twitter: {
    card: "summary_large_image",
    site: "@GoatEdu",
    title: "Home",
    description:
      "Welcome to GoatEdu, the leading educational platform for students worldwide. Explore our expert guidance and resources to achieve academic excellence.",
    images: "https://www.goatedu.tech/images/screenshot.jpeg",
  },
};

export default function Home() {
  return <Body />;
}
