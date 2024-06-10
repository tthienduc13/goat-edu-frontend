import { currentUser } from "@/lib/auth";
import { MetadataRoute } from "next";
import { getAllFlashcardSitemap } from "./api/flashcard/flashcard.api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const user = await currentUser();

  const flashcards = await getAllFlashcardSitemap(user?.token!);
  const flashcardsUrls = flashcards.map((data) => ({
    url: `${process.env.NEXT_PUBLIC_URL}/flashcards/${data.id}`,
    lastModified: new Date(data.updatedAt),
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_URL}`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
      lastModified: new Date(),
      priority: 0.8,
    },
    ...flashcardsUrls,
  ];
}
