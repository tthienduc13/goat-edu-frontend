"use client";
import { useState } from "react";
import { Rating as ReactRating } from "@smastrom/react-rating";
import { useRate } from "@/app/api/rate/rate.query";
import { useCurrentUser } from "@/hooks/use-current-user";
interface StarProps {
  id: string;
}
export const Star = ({ id }: StarProps) => {
  const user = useCurrentUser();
  const [ratingCount, setRatingCount] = useState<number>(0);
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
  const { mutate: rate } = useRate({ token: user?.token!, id: id });
  const handleRate = async (selectedValue: number) => {
    try {
      setIsReadOnly(true);
      rate({ rate: selectedValue });
    } catch (error) {
      setRatingCount(0);
      console.log("Error rating", error);
    }
  };
  return (
    <ReactRating
      className="h-5 w-5"
      style={{ maxWidth: 100 }}
      readOnly={isReadOnly}
      value={ratingCount}
      onChange={(selectedValue: number) => handleRate(selectedValue)}
    />
  );
};
