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
//           color: "white",
//           backgroundColor: "black",
//           animation: "moveText 15s linear infinite",
//         }}
//       >
//         {/* Duplicate the text for seamless scrolling */}
//         <h1
//           style={{
//             fontSize: "100px",
//             lineHeight: "10rem",
//             fontWeight: "bolder",
//             margin: 0,
//           }}
//         >
//           <span style={{ marginRight: "2rem", letterSpacing: "0.5rem" }}>
//             SERVICING LOCAL NEPALI PRODUCTS TO THE WORLD MADE IN NEPAL
//           </span>
//           <span style={{ marginRight: "2rem", letterSpacing: "0.5rem" }}>
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
          animation: "moveText 15s linear infinite",
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
          className="scrolling-text"
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
          
          /* Adjust font size for small screens */
          @media (max-width: 768px) {
            .scrolling-text {
              font-size: 40px;
              line-height: 5rem;
            fontWeight: "unset",
            }
          }
          
          @media (max-width: 480px) {
            .scrolling-text {
              font-size: 30px;
              line-height: 3.5rem;
            fontWeight: "unset",
            }
          }
        `}
      </style>
    </div>
  );
};

export default Digital;
