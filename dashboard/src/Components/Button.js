// src/components/ui/button.js
import React from "react";

const Button = ({ children, size, variant, onClick }) => {
  const baseClass = "btn";
  const sizeClass = size === "sm" ? "btn-sm" : "btn-lg"; // small or large button
  const variantClass =
    variant === "outline" ? "btn-outline-primary" : "btn-primary"; // outline or solid

  return (
    <button
      className={`${baseClass} ${sizeClass} ${variantClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button };
