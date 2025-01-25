import React from "react";

const Footer = () => {
  return (
    <div
      className="footer-container"
      style={{
        backgroundColor: "#e7e3ed",
        width: "100%",
        textAlign: "center",
        padding: "10px 0",
      }}
    >
      <div
        className="flex card shadow-sm p-4 m-4"
        style={{
          backgroundColor: "white",
        }}
      >
        <p>Copyright © 2025 Ecommerce. All rights reserved</p>
      </div>
    </div>
  );
};
export default Footer;
