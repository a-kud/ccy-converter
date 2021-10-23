import React from "react";

interface ButtonProps {
  children: React.ReactChild;
  onClick?: () => void;
  className?: string;
}

export function Button({ className, children, onClick }: ButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button className={className} disabled={!onClick} onClick={handleClick}>
      {children}
    </button>
  );
}
