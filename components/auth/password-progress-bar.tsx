import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

interface PasswordProgressBarProps {
  password: string;
}

export const PasswordProgressBar: React.FC<PasswordProgressBarProps> = ({
  password,
}) => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    setScore(calculatePasswordStrength(password));
  }, [password]);

  const calculatePasswordStrength = (password: string): number => {
    if (!password) return 0;

    let strength = 0;
    const criteria = [
      { regex: /.{6,}/, score: 15 },
      { regex: /[a-z]/, score: 15 },
      { regex: /[A-Z]/, score: 15 },
      { regex: /[0-9]/, score: 15 },
    ];

    criteria.forEach(({ regex, score }) => {
      if (regex.test(password)) {
        strength += score;
      }
    });

    return Math.min(strength, 60); // Max score is 100
  };
  console.log(score);

  return (
    <div
      style={{ width: `${score}%` }}
      className={cn(
        "absolute bottom-0 h-[3px] rounded-[10px] transition-all",
        score < 60 ? "bg-destructive" : "bg-emerald-500"
      )}
    ></div>
  );
};
