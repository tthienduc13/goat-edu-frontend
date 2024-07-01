import axios from "axios";
import mammoth from "mammoth";

export const fetchAndParseDocx = async (url: string) => {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    console.log("response la", response);
    const arrayBuffer = response.data;

    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value; // The raw text content of the .docx file
  } catch (error) {
    console.error("Error fetching or parsing .docx file:", error);
    throw error;
  }
};
