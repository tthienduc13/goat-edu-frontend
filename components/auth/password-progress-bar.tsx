import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

interface PasswordProgressBarProps {
  password: string;
}

export const PasswordProgressBar = ({ password }: PasswordProgressBarProps) => {
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
      { regex: /[!@#$%^&*]/, score: 15 },
    ];
    criteria.forEach(({ regex, score }) => {
      if (regex.test(password)) {
        strength += score;
      }
    });

    return Math.min(strength, 75);
  };

  return (
    <div
      style={{ width: `${score}%` }}
      className={cn(
        "absolute bottom-0 h-[3px] rounded-[10px] transition-all",
        score < 75 ? "bg-destructive" : "bg-emerald-500"
      )}
    ></div>
  );
};
