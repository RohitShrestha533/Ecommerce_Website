"use client";

import { User, Gift, Package } from "lucide-react";

const HowToGetStarted = () => {
  return (
    <div
      className="container py-5 w-100"
      style={{ backgroundColor: "#FFF8F0", maxWidth: "100%" }}
    >
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">
          How to Get Started with Nepali Kala
        </h1>
        <p className="lead text-muted">
          Follow these simple steps to begin your journey with us.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="position-relative">
            {/* Step 1 */}
            <div className="row mb-5 position-relative">
              <div className="col-2 col-md-3 text-center">
                <div
                  className="rounded-circle bg-white p-3 d-inline-flex position-relative"
                  style={{ border: "2px solid #dee2e6" }}
                >
                  <User className="text-primary" size={24} />
                </div>
              </div>
              <div className="col-10 col-md-9">
                <h3 className="fw-bold">Create Your Account</h3>
                <p className="text-muted">
                  Sign up to access our exclusive collection and personalized
                  recommendations.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="row mb-5 position-relative">
              <div className="col-2 col-md-3 text-center">
                <div
                  className="rounded-circle bg-white p-3 d-inline-flex position-relative"
                  style={{ border: "2px solid #dee2e6" }}
                >
                  <Gift className="text-primary" size={24} />
                </div>
              </div>
              <div className="col-10 col-md-9">
                <h3 className="fw-bold">Explore Our Collection</h3>
                <p className="text-muted">
                  Browse through our diverse range of authentic Nepali products.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="row position-relative">
              <div className="col-2 col-md-3 text-center">
                <div
                  className="rounded-circle bg-white p-3 d-inline-flex position-relative"
                  style={{ border: "2px solid #dee2e6" }}
                >
                  <Package className="text-primary" size={24} />
                </div>
              </div>
              <div className="col-10 col-md-9">
                <h3 className="fw-bold">Enjoy Your Purchase</h3>
                <p className="text-muted">
                  Receive your items and immerse yourself in the beauty of
                  Nepali culture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HowToGetStarted;
