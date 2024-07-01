// pages/api/fetchDocx.ts
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Missing or invalid URL parameter" });
  }

  try {
    console.log("Fetching .docx file from URL:", url); // Log the URL being fetched
    const response = await axios.get(url, { responseType: "arraybuffer" });
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching .docx file:", error);
    res.status(500).json({ error: "Error fetching .docx file" });
  }
}
