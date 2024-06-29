import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Image1 from "../assets/images/1.jpg";
import Image2 from "../assets/images/2.jpg";
import Image3 from "../assets/images/3.jpg";
import Image4 from "../assets/images/4.jpg";
import Counter from "../components/GlobalComponents/Counter";
import { loadStripe } from "@stripe/stripe-js";

// const stripe = require("stripe")(process.env.STRIPE_SECRET);

const productImages = [
  {
    id: 1,
    image: Image1,
  },
  {
    id: 2,
    image: Image2,
  },
  {
    id: 3,
    image: Image3,
  },
  {
    id: 4,
    image: Image4,
  },
];

const WorkSpaceCardId = () => {
  const [hoveredImage, setHoveredImage] = useState(productImages[0]?.image);
  const [activeImage, setActiveImage] = useState(productImages[0]?.id);
  const [quantity, setQuantity] = useState(0);
  const [pricePerKg, setPricePerKg] = useState(0);
  const navigate = useNavigate();

  //   const makePayment = async () => {
  //     const stripe = await loadStripe(
  //       "pk_test_51PWyR4KZkMznp2PVh4mtWVGsAtVBEmqXNGTwQjzpRIpQzFtXEe7YqvPXAVDHoehK6ng1AqK7wk2HQjhGz67grYo500gnWhYNPR"
  //     );

  //     const body = {
  //       products: "2 hours time",
  //     };

  //     const header = {
  //       "Content-Type": "Application/Json",
  //     };

  //     const response = await fetch(`${apiUrl}/create-checkout-session`, {
  //       method: "POST",
  //       header: header,
  //       body: json.stringify(body),
  //     });

  //     const session = await response.json();

  //     const result = stripe.redirectToCheckout({
  //       sessionId: session.id,
  //     });
  //   };

  return (
    <>
      <div className="container body-otr mb-4 product-details">
        <h2>Details</h2>
        <div className="row">
          <div className="col-lg-5">
            <div className="d-flex card justify-content-center">
              <div className="m-2">
                <div className="img-preview text-center">
                  <img src={hoveredImage} alt="watch" className="h-100" />
                </div>
                <div className="thumbnail-container justify-content-center">
                  {productImages?.map((res) => {
                    return (
                      <div
                        key={res?.id}
                        className={`me-2 cursor-pointer ${
                          activeImage === res?.id ? "shadow" : ""
                        }`}
                        onMouseEnter={() => {
                          setHoveredImage(res?.image);
                          setActiveImage(res?.id);
                        }}
                      >
                        <img src={res?.image} alt="product" className="w-100" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="product-summary">
              <h3 className="product-name mb-0">
                Imesta Organic Cocoa Powder, 250g - Carton of 40
              </h3>
              <hr className="mt-0" />
              <div className="offer-price mt-2">
                ₹ 850.00
                <span className="fs-6">/ 1 kg</span>
              </div>
              <p className="mt-2">
                <span className="EMI-options fw-bold">
                  Close Date: 12/09/2024
                </span>
              </p>
              <hr />

              <div className="description">
                <p className="EMI-options">
                  <span className="fw-bold">Description: </span>Imesta Organic
                  Cocoa Powder is 100% pure and free from artificial additives,
                  ensuring a wholesome and natural experience. It is
                  meticulously processed to retain its nutrients and
                  antioxidants, making it a healthy choice for your kitchen.
                  Whether you're whipping up decadent desserts, crafting creamy
                  hot chocolate, or adding a chocolatey twist to your smoothies
                  and oatmeal, Imesta's cocoa powder is your go-to ingredient
                  for a rich, velvety taste.
                </p>
              </div>

              {/* Offers  */}
              {/* <div className="offers">
                <div className="fw-bold">
                  <span className="me-3 text-warning">%</span>Offers
                </div>
                <div className="d-flex gap-2 mt-3">
                  <div className="card">
                    <div className="card-body p-2">
                      <h6>No Cost EMI</h6>
                      <p>
                        Upto ₹1,435.05 EMI interest savings on select Credit
                        Cards
                      </p>
                      <span className="brand-name">2 Offers {">"}</span>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body p-2">
                      <h6>Bank Offer</h6>
                      <p>
                        Upto ₹1,435.05 EMI interest savings on select Credit
                        Cards
                      </p>
                      <span className="brand-name">2 Offers {">"}</span>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body p-2">
                      <h6>Partner Offer</h6>
                      <p>
                        Upto ₹1,435.05 EMI interest savings on select Credit
                        Cards
                      </p>
                      <span className="brand-name">2 Offers {">"}</span>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="col-lg-3 mt-4 mt-lg-0">
            <div className="card shadow-0 border mb-3">
              <div className="card-body">
                <p className="fw-bold text-end">
                  <span>Max Qty : 200kg</span>
                </p>
                <form>
                  <div className="form-group">
                    <Counter
                      label="Quantity"
                      initialCount={quantity}
                      onChange={(newCount) => setQuantity(newCount)}
                    />
                  </div>
                </form>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Total Price:</p>
                  <p className="mb-2 fw-bold">₹ 850.00</p>
                </div>
                <div className="mt-3">
                  <button
                    className="btn btn-warning w-100 shadow-0 mb-2"
                    onClick={() => navigate("/shopping-cart")}
                    // onClick={makePayment}
                  >
                    Add Bid
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkSpaceCardId;
