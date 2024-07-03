"use client";
import { useEffect } from "react";
import { Wrapper } from "../_components/wrapper";
import { AccountDeletion } from "./_components/account-deletion";

import { AccountInformation } from "./_components/account-information";
import { AccountPassword } from "./_components/account-password";
import { AvatarChanging } from "./_components/avatar-changing";
import mammoth from "mammoth";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    res.status(400).json({ error: "Invalid URL" });
    return;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching document: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    res.setHeader("Content-Type", "application/octet-stream");
    res.status(200).send(Buffer.from(arrayBuffer));
  } catch (error) {
    res.status(500).json("error");
  }
};

const ProfilePage = () => {
  useEffect(() => {
    const fetchAndReadDocx = async (url: string): Promise<void> => {
      try {
        const apiUrl = `/api/fetch-docx?url=${encodeURIComponent(url)}`;
        const response = await fetch(apiUrl, { method: "GET" });
        if (!response.ok) {
          throw new Error(`Error fetching document: ${response.statusText}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        console.log(result.value);
      } catch (error) {
        console.error("Error reading DOCX:", error);
      }
    };
    fetchAndReadDocx(
      "https://storage.googleapis.com/swd392/theory/.docx/5efc058a-00b0-4afc-86dc-37ec9749ccf31719857668"
    );
  }, []);
  return (
    <Wrapper title="Profile">
      <div className="flex pb-10 flex-col h-full overflow-y-scroll no-scrollbar w-full gap-y-10">
        <AvatarChanging />
        <AccountInformation />
        <AccountPassword />
        <AccountDeletion />
      </div>
    </Wrapper>
  );
};

export default ProfilePage;
