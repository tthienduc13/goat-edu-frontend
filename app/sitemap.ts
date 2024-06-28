import { MetadataRoute } from "next";
import { getAllFlashcardSitemap } from "./api/flashcard/flashcard.api";
import { getAllDiscussionSitemap } from "./api/discussion/discussion.api";
import { Status } from "@/types/discussion";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const flashcards = await getAllFlashcardSitemap();
  const discussions = await getAllDiscussionSitemap(Status.Approved);
  const flashcardsUrls = flashcards.map((data) => ({
    url: `${process.env.NEXT_PUBLIC_URL}/flashcards/${data.id}`,
    lastModified: new Date(data.updatedAt),
  }));
  const discussionsUrls = discussions.map((data) => ({
    url: `${process.env.NEXT_PUBLIC_URL}/discussed/${data.id}`,
    lastModified: new Date(data.createdAt),
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
    ...discussionsUrls,
  ];
}
