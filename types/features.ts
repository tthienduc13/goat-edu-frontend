import { StaticImageData } from "next/image";

export type Feature = {
  id: number;
  name: string;
  des: string;
  image: StaticImageData;
  backgroundColor: string;
};
