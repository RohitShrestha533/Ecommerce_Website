// import React from "react";

// const Digital = () => {
//   return (
//     <div
//       style={{
//         display: "flex",
//         width: "100%",
//         color: "white",
//         overflow: "hidden",
//         position: "relative",
//         alignItems: "center",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           whiteSpace: "nowrap",
//           backgroundColor: "black",
//           animation: "moveText 5s linear infinite",
//         }}
//       >
//         <h1 style={{ lineHeight: "10rem", fontSize: "100px" }}>
//           <span style={{ padding: "0 0.2rem", fontWeight: "bolder" }}>
//             SERVICING LOCAL NEPALI PRODUCTS TO THE WORLD MADE IN NEPAL
//           </span>
//         </h1>
//       </div>

//       <style>
//         {`
//           @keyframes moveText {
//             0% {
//               transform: translateX(0%);
//             }
//             100% {
//               transform: translateX(-50%);
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Digital;

import React from "react";

const Digital = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        color: "white",
        overflow: "hidden",
        position: "relative",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          color: "white",
          backgroundColor: "black",
          animation: "moveText 10s linear infinite",
        }}
      >
        {/* Duplicate the text for seamless scrolling */}
        <h1
          style={{
            fontSize: "100px",
            lineHeight: "10rem",
            fontWeight: "bolder",
            margin: 0,
          }}
        >
          <span style={{ marginRight: "2rem", letterSpacing: "0.5rem" }}>
            SERVICING LOCAL NEPALI PRODUCTS TO THE WORLD MADE IN NEPAL
          </span>
          <span style={{ marginRight: "2rem", letterSpacing: "0.5rem" }}>
            SERVICING LOCAL NEPALI PRODUCTS TO THE WORLD MADE IN NEPAL
          </span>
        </h1>
      </div>

      <style>
        {`
          @keyframes moveText {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Digital;
