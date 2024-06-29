import React, { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import Image1 from "../assets/images/1.jpg";
import Image2 from "../assets/images/2.jpg";
import Image3 from "../assets/images/3.jpg";
import Image4 from "../assets/images/4.jpg";
import { useNavigate } from "react-router-dom";

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

const WorkspaceCard = () => {
  const navigate = useNavigate();
  const [hoveredImage, setHoveredImage] = useState(productImages[0]?.image);
  const [activeImage, setActiveImage] = useState(productImages[0]?.id);

  return (
    <>
      <Card
        className="hotel-card mb-3 cursor-pointer"
        onClick={() => navigate("/work-space-id")}
      >
        <Row noGutters>
          <Col md={4}>
            <div className="d-flex justify-content-center">
              <div className="m-2">
                <div className="img-preview text-center">
                  <img src={hoveredImage} alt="watch" className="h-100" />
                </div>
                <div className="thumbnail-container">
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
          </Col>
          <Col md={5}>
            <Card.Body>
              <Card.Title>
                Ginger Goa, Panjim <span className="stars">★★★☆☆</span>
              </Card.Title>
              <div>
                <p>
                  <span className="location">Panjim</span> | 1.8 km drive to
                  Deltin Royale
                </p>
                <p>
                  <span className="">Couple Friendly</span>
                </p>
                <p>
                  <span className="">Book with ₹0 Payment</span>
                </p>
                <p>
                  <span className="features">
                    Prime location, top-notch amenities, and great dining
                  </span>
                </p>
              </div>
            </Card.Body>
          </Col>
          <Col md={3} className="text-end">
            <Card.Body>
              <div className="rating">
                <span className="text-success">Very Good</span>{" "}
                <span className="rating-score">3.9</span>
                <br />
                <span className="ratings">(5593 Ratings)</span>
              </div>
              <div className="price">
                ₹3,499
                <br />
                <span className="taxes">+ ₹420 taxes & fees</span>
                <br />
                Per Night
              </div>
              <small className="login-link cursor-pointer text-end">
                Login to Book Now & Pay Later!
              </small>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default WorkspaceCard;
