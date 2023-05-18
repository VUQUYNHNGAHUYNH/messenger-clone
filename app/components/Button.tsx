"use client";

import clsx from "clsx";

type ButtonProps = {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
  secondary?: boolean;
  children?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  onClick,
  danger,
  disabled,
  secondary,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`,
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        danger &&
          "bg-rose-600 hover:bg-rose-700 focus-visible:outline-rose-600",
        secondary ? "text-slate-900" : "text-white",
        !secondary &&
          !danger &&
          "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
