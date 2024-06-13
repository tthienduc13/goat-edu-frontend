import { cn } from "@/lib/utils";

import React, { useState } from "react";
import { FieldError, UseFormRegister, UseFormWatch } from "react-hook-form";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldEllipsis,
  User,
  AtSign,
} from "lucide-react";
import { PasswordProgressBar } from "@/components/auth/password-progress-bar";
import { Input } from "../ui/input";

type InputFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  register?: UseFormRegister<any>;
  watch?: UseFormWatch<any>;
  type?: string;
  error?: FieldError;
  errorType?: "danger" | "default";
  isValid?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
  register,
  type = "text",
  error,
  errorType = "default",
  isValid,
  watch,
}) => {
  const passwordValue = watch ? watch("password") : "";

  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <div className="flex relative flex-col items-stretch">
      <div
        className={cn(
          "flex border-l-[2px] border-transparent cursor-text relative rounded-[14px] flex-row items-center pl-3 px-4 h-12 overflow-hidden bg-[#a8b3cf14]",
          isFocused &&
            "border-white border-[1px] bg-black text-white hover:bg-black",
          error
            ? "inset-shadow-invalid"
            : "hover:border-l-white hover:border-l-[2px] border-l-[2px]  ",
          isValid && "inset-shadow-valid" // Include the class name directly
        )}
      >
        {name === "email" ? (
          <Mail className="h-5 w-5 mr-2 text-muted-foreground hover:text-white" />
        ) : name === "password" ? (
          <Lock className="h-5 w-5 mr-2 text-muted-foreground hover:text-white" />
        ) : name === "code" ? (
          <ShieldEllipsis className="h-5 w-5 mr-2 text-muted-foreground hover:text-white" />
        ) : name === "fullname" ? (
          <User className="h-5 w-5 mr-2 text-muted-foreground hover:text-white" />
        ) : name === "username" ? (
          <AtSign className="h-5 w-5 mr-2 text-muted-foreground hover:text-white" />
        ) : (
          ""
        )}
        <div className="flex flex-col flex-1 items-start max-w-full">
          {isFocused && (
            <div className="text-muted-foreground text-xs">{label}</div>
          )}
          <Input
            type={isPasswordVisible ? "text" : type}
            placeholder={isFocused ? "" : placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              "self-stretch border-none shadow-none outline-none text-ellipsis text-muted-foreground bg-transparent hover:text-white focus:outline-none focus-visible:ring-0"
            )}
          />
        </div>
        {type === "password" && (
          <PasswordProgressBar password={passwordValue!} />
        )}
        {type === "password" && (
          <div onClick={togglePasswordVisibility} className="cursor-pointer">
            {isPasswordVisible ? (
              <EyeOff
                className={cn(
                  "h-5 w-5 mr-2 rotate-180 text-muted-foreground hover:text-white",
                  isFocused && "text-white"
                )}
              ></EyeOff>
            ) : (
              <Eye
                className={cn(
                  "h-5 w-5 mr-2 rotate-180 text-muted-foreground hover:text-white",
                  isFocused && "text-white"
                )}
              ></Eye>
            )}
          </div>
        )}
      </div>
      {error ? (
        <div
          className={cn(
            "mt-1 px-2 h-4 typo-caption1  ",
            errorType === "danger"
              ? "text-destructive"
              : "text-muted-foreground"
          )}
        >
          {error?.message}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
