// src/components/ui/card.js
import React from "react";

const Card = ({ children, className }) => {
  return <div className={`card ${className}`}>{children}</div>;
};

const CardContent = ({ children }) => {
  return <div className="card-body">{children}</div>;
};

export { Card, CardContent };
