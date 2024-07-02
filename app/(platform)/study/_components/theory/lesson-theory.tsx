import { fetchAndParseDocx } from "@/actions/read-docs";
import { useTheoryByLesson } from "@/app/api/theory/theory.query";
import Tiptap from "@/components/math-render/tiptap";
import { useCurrentUser } from "@/hooks/use-current-user";
import axios from "axios";
import mammoth from "mammoth";
import React, { useEffect, useState } from "react";

const LessonTheory = () => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const user = useCurrentUser();
  // const {
  //   data: theoryData,
  //   isLoading: theoryLoading,
  //   error: theoryError,
  // } = useTheoryByLesson(
  //   "8a6f94ce-f5da-4b82-915c-bd74f17ea98d",
  //   user?.token as string
  // );

  // useEffect(() => {
  //   const fetchAndReadDocx = async (url: string): Promise<void> => {
  //     try {
  //       const apiUrl = `/api/fetch-docx?url=${encodeURIComponent(url)}`;
  //       const response = await fetch(apiUrl, { method: "GET" });
  //       if (!response.ok) {
  //         throw new Error(`Error fetching document: ${response.statusText}`);
  //       }
  //       const arrayBuffer = await response.arrayBuffer();
  //       const result = await mammoth.extractRawText({ arrayBuffer });
  //       setContent(result.value);
  //       console.log(result.value);
  //     } catch (error) {
  //       console.error("Error reading DOCX:", error);
  //     }
  //   };
  //   fetchAndReadDocx(
  //     "https://storage.googleapis.com/swd392/theory/.docx/5efc058a-00b0-4afc-86dc-37ec9749ccf31719857668"
  //   );
  // }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Tiptap />
    </div>
  );
};

export default LessonTheory;
