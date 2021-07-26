interface IClassName {
  className?: string;
}

interface BubbleProps extends IClassName {
  children: JSX.Element | string;
  onClick?: () => void;
  size?: "small" | "large";
}

const Bubble = ({
  children,
  onClick,
  className = "",
  size = "large",
}: BubbleProps): JSX.Element => {
  const sizeClasses =
    size === "large" ? "w-9 h-9 sm:w-14 sm:h-14 p-2 sm:p-3" : "w-9 h-9 p-2";

  return (
    <button
      className={`bg-black rounded-full flex justify-center items-center cursor-pointer sm:transition-transform sm:duration-300 sm:ease-in-out sm:transform sm:hover:scale-110 focus:outline-none ${className} ${sizeClasses}`}
      onClick={onClick ? () => onClick() : () => false}
    >
      <span className="text-white relative min-h-full min-w-full">
        {children}
      </span>
    </button>
  );
};

export default Bubble;
