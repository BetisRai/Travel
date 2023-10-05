import { Card, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import SearchRoutes from "../../Forms/searchRoutes";
import CarouselImage from "../../components/carousel";
import collageimg from "../../assets/mask.png";

const cardStyle: React.CSSProperties = {
  width: 500,
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  position: "absolute",
  top: 60,
  right: 10,
  background: "rgba(255, 255, 255, 0.2)",
  borderRadius: "16px",
  backdropFilter: "blur(5px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
};

const UserHomeSearch = () => {
  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 650,
          position: "relative",
        }}
      >
        <CarouselImage />

        <Card style={cardStyle}>
          <SearchRoutes />
        </Card>
      </Content>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div>
          <img src={collageimg} alt="" height={"300px"} width={"500px"} />
        </div>
        <div
          style={{
            width: "50vw",
            fontSize: "1.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "3rem" }}>"</span>
          <span>
            Travel is more than just a journey; it is the pursuit of new
            horizons, the exploration of unfamiliar cultures, and the discovery
            of one's own self. It is a tapestry of moments woven together by the
            threads of anticipation and excitement, of awe and wonder, and of
            joy and introspection.
          </span>
          <span style={{ fontSize: "3rem" }}>"</span>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div
        style={{
          backgroundColor: "#36454F",
          height: "300px",
          color: "white",
          width: "80vw",
          margin: "auto",
          padding: "1rem 2rem",
        }}
      >
        <h1 style={{ textDecoration: "underline" }}>Top Routes</h1>
        <br />
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <h3>Kathmandu - Pokhara</h3>
          <h3>Pokhara - Kathmandu</h3>
          <h3>Belbari - Kathmandu</h3>
          <h3>Butwal - Kathmandu</h3>
        </div>
      </div>
      <br />
      <br />
    </Layout>
  );
};

export default UserHomeSearch;
