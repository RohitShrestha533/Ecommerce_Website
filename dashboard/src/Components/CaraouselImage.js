// import React, { useState } from "react";
// import axios from "axios";

// const CarouselImage = () => {
//   const [images, setImages] = useState([]);

//   const handleFileChange = (e) => {
//     setImages(e.target.files); // Store all selected files
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();

//     if (images.length === 0) {
//       alert("Please select at least one image!");
//       return;
//     }

//     const formData = new FormData();
//     for (let i = 0; i < images.length; i++) {
//       formData.append("images", images[i]); // Append each file to the FormData object
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/admin/Carousel",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("Upload successful", response.data);
//       alert("Images uploaded successfully!");
//     } catch (error) {
//       console.error("Error uploading images", error);
//       alert("Error uploading images");
//     }
//   };

//   return (
//     <div>
//       <h2>Upload Multiple Images</h2>
//       <form onSubmit={handleUpload}>
//         <input
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={handleFileChange}
//         />
//         <button type="submit">Upload</button>
//       </form>
//     </div>
//   );
// };

// export default CarouselImage;

import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const CarouselImage = () => {
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    setImages(e.target.files); // Store all selected files
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      alert("Please select at least one image!");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]); // Append each file to the FormData object
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/admin/Carousel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload successful", response.data);
      alert("Images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading images", error);
      alert("Error uploading images");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Upload Multiple Images</h2>
      <form
        onSubmit={handleUpload}
        className="row gy-3 justify-content-center align-items-center"
      >
        <div className="col-12 col-md-8">
          <input
            type="file"
            accept="image/*"
            multiple
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
        <div className="col-12 col-md-4 text-center">
          <button type="submit" className="btn btn-primary w-100">
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarouselImage;
