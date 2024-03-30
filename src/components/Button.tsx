import React from "react";

interface ButtonProps {
  text: string;
  buttonType?: string;
  onClick?: () => void;
  disabled?: boolean;
  answerStatus?: "correct" | "wrong";
}

const Button: React.FC<ButtonProps> = ({
  text,
  buttonType,
  onClick,
  disabled,
  answerStatus,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex justify-center gap-2 rounded-xl border-2 bg-thymia-purple text-white font-bold tracking-widest p-3 transition ease-in-out duration-150 hover:scale-105 
        ${buttonType || ""} 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""} 
        ${answerStatus === "correct" ? "correct-answer" : ""} 
        ${answerStatus === "wrong" ? "wrong-answer" : ""}
      `}
    >
      {disabled ? "Wait ✋" : text}
    </button>
  );
};

export default Button;
