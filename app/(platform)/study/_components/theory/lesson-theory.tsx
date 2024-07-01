import { fetchAndParseDocx } from "@/actions/read-docs";
import { useTheoryByLesson } from "@/app/api/theory/theory.query";
import { useCurrentUser } from "@/hooks/use-current-user";
import axios from "axios";
import React, { useEffect, useState } from "react";

const LessonTheory = () => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const user = useCurrentUser();
  const {
    data: theoryData,
    isLoading: theoryLoading,
    error: theoryError,
  } = useTheoryByLesson(
    "8a6f94ce-f5da-4b82-915c-bd74f17ea98d",
    user?.token as string
  );
  const fileUrl =
    "https://storage.googleapis.com/swd392/theory/.docx/bae8476c-af9c-4dc2-8cd1-65c6c20351631719676750";

  useEffect(() => {
    const getFileContent = async () => {
      // try {
      //   const parsedContent = await fetchAndParseDocx(fileUrl);

      //   setContent(parsedContent);
      // } catch (err) {
      //   setError("Failed to load the content.");
      // }

      const response = await axios.get(fileUrl, {
        responseType: "arraybuffer",
      });
      console.log("response la", response);
    };

    getFileContent();
  }, [fileUrl]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Lesson Content</h1>
      <pre>{content}</pre>
    </div>
  );
};

export default LessonTheory;
