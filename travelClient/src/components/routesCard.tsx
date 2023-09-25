import { Button, Card, Col, Row, Space, Typography } from "antd";
import dayjs from "dayjs";

interface routesProps {
  busLogo: string;
  busName: string;
  busNumber: string;
  type: "non-stop" | "transit";
  depatureTime: string;
  depaturePlace: string;
  arrivalPlace: string;
  arrivalTime: string;
  price: string;

  id: string;
  onBook: (id: string) => void;
}

const RoutesCard = ({
  busLogo,
  busName,
  arrivalTime,
  busNumber,
  depatureTime,
  price,
  type,
  arrivalPlace,
  depaturePlace,
  id,
  onBook,
}: routesProps) => {
  return (
    <Card
      bordered={false}
      style={{
        width: "80%",
        margin: "1rem",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <Row>
        <Col span={3}>
          <Space>
            <div
              style={{
                padding: "0.5rem",
                backgroundColor: "lightgrey",
                color: "white",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Typography.Title
                level={5}
                style={{ marginBottom: "0.5rem", color: "#ffffff" }}
              >
                {busLogo}
              </Typography.Title>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography.Text style={{ fontWeight: "700" }}>
                {busName}
              </Typography.Text>
              <Typography.Text style={{}}>{busNumber}</Typography.Text>
            </div>
          </Space>
        </Col>

        <Col span={4}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography.Title level={4}>{depatureTime}</Typography.Title>
            <Typography.Text>{depaturePlace}</Typography.Text>
          </div>
        </Col>
        <Col span={7} style={{ display: "grid", placeItems: "center" }}>
          <div
            style={{
              height: "3px",
              width: "100%",
              backgroundColor: "lightgrey",
            }}
          ></div>
          <Typography.Text style={{ fontWeight: "700" }}>
            {type}
          </Typography.Text>
        </Col>

        <Col span={4}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography.Title level={4}>{arrivalTime}</Typography.Title>
            <Typography.Text>{arrivalPlace}</Typography.Text>
          </div>
        </Col>
        <Col span={4} style={{ display: "grid", placeItems: "center" }}>
          <Typography.Title level={2}>Rs.{price}</Typography.Title>
        </Col>

        <Col span={2} style={{ display: "grid", placeItems: "center" }}>
          <Button type="primary" htmlType="submit" onClick={() => onBook(id)}>
            Book now
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default RoutesCard;
