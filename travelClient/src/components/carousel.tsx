import { Carousel } from "antd";
import React from "react";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";

const contentStyle: React.CSSProperties = {
  height: "400px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const CarouselImage = () => {
  return (
    <Carousel effect="fade" autoplay autoplaySpeed={5000}>
      <div>
        <h3 style={contentStyle}>
          <img src={img1} alt="" style={imageStyle} />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <img src={img2} alt="" style={imageStyle} />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <img src={img3} alt="" style={imageStyle} />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <img src={img3} alt="" style={imageStyle} />
        </h3>
      </div>
    </Carousel>
  );
};

export default CarouselImage;
