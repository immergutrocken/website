interface ButtonProps {
  children: JSX.Element | string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  size?: "small" | "large";
  success?: boolean;
}

const Button = ({
  children,
  className = "",
  onClick,
  disabled = false,
  active = true,
  size = "large",
  success = false,
}: ButtonProps): JSX.Element => (
  <button
    className={`text-white rounded-full focus:outline-none font-important uppercase flex justify-center items-center ${className} ${
      active ? "bg-black" : "bg-gray-200"
    } ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${
      size === "small"
        ? "px-2.5 sm:px-4 text-base sm:text-xl h-8 sm:h-14"
        : "px-2.5 sm:px-4 text-lg sm:text-4xl h-8 sm:h-14"
    } ${success ? "bg-green-500" : ""}`}
    onClick={() => (onClick ? onClick() : {})}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
