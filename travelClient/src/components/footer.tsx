import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";

const FooterLayout = () => {
  return (
    <div>
      <Row justify={"center"}>
        <Col>Welcome to Travel</Col>
      </Row>
      <br></br>
      <Row justify={"center"}>
        <Col>
          <div style={{ display: "flex", gap: "1rem" }}>
            <FacebookOutlined />
            <TwitterOutlined />
            <LinkedinOutlined />
            <InstagramOutlined />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FooterLayout;
