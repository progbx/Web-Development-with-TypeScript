import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

const Button: React.FC<ButtonProps> = ({ label, ...props }) => {
  return (
    <button type="submit" {...props}>
      {label}
    </button>
  );
};

export default Button;
