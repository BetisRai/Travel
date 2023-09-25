import { Card, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import SearchRoutes from "../../Forms/searchRoutes";
import CarouselImage from "../../components/carousel";

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
          minHeight: 800,
          position: "relative",
        }}
      >
        <CarouselImage />

        <Card style={cardStyle}>
          <SearchRoutes />
        </Card>
      </Content>
    </Layout>
  );
};

export default UserHomeSearch;
