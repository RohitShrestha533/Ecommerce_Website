import React from "react";

const Demo = () => {
  return (
    <div className="container my-5" style={{ maxWidth: "80%" }}>
      <div className="row mb-5">
        <div className="col-md-4 col-sm-12 col-lg-4 mb-4 p-3">
          <h1 className="fw-bold">
            Discover the Charm <br /> of Nepali Craftsmanship
          </h1>
        </div>

        {/* Grid layout for content */}
        <div
          className="col-md-8 col-sm-12 col-lg-8"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)", // Two equal columns
            gap: "1rem",
          }}
        >
          {/* First Row */}
          <div className="p-4">
            <div className="icon-wrapper text-center align-content-center bg-warning text-white rounded-circle mb-3 d-inline-block">
              <i className="fas fa-hand-paper fa-2x"></i>
            </div>
            <h4 className="fw-bold">Handcrafted Excellence</h4>
            <p>
              Our products are crafted with care and precision, reflecting the
              true spirit of Nepali artisans.
            </p>
          </div>

          <div className="p-4">
            <div className="icon-wrapper text-center align-content-center bg-warning text-white rounded-circle mb-3 d-inline-block">
              <i className="fas fa-landmark fa-2x"></i>
            </div>
            <h4 className="fw-bold">Cultural Significance</h4>
            <p>
              Each piece tells a story, deeply rooted in the traditions and
              culture of Nepal.
            </p>
          </div>

          {/* Second Row */}
          <div className="p-4">
            <div className="icon-wrapper text-center align-content-center bg-warning text-white rounded-circle mb-3 d-inline-block">
              <i className="fas fa-leaf fa-2x"></i>
            </div>
            <h4 className="fw-bold">Sustainable Practices</h4>
            <p>
              We prioritize eco-friendly methods to preserve the beauty of our
              homeland.
            </p>
          </div>

          <div className="p-4">
            <div className="icon-wrapper text-center align-content-center bg-warning text-white rounded-circle mb-3 d-inline-block">
              <i className="fas fa-gem fa-2x"></i>
            </div>
            <h4 className="fw-bold">Unique Designs</h4>
            <p>
              Our collection features exclusive designs that stand out and
              captivate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
