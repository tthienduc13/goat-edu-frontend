import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GoatEdu",
    short_name: "GoatEdu",
    description:
      "Welcome to GoatEdu, the No.1 learning platform for students worldwide. Discover comprehensive resources, expert guidance, and personalized learning tools to excel in your academic pursuits. Special focus on helping students in Vietnam prepare for the National High School Exam.",
    icons: [
      {
        src: "https://www.goatedu.tech/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "https://www.goatedu.tech/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#0F172A",
    background_color: "#FFFFFF",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    scope: "/",
  };
}
