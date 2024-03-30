interface ButtonProps {
  text: string;
  buttonType?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  text,
  buttonType,
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      className={`flex justify-center gap-2 rounded-xl border-2 bg-thymia-purple text-white font-bold tracking-widest p-3 transition ease-in-out duration-150 hover:scale-105 ${
        buttonType || ""
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? "Wait ✋" : text}
    </button>
  );
}
