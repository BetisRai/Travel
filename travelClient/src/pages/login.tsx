import { Card, Row } from "antd";
import SingnIn from "../Forms/singnIn";

const Login = () => {
  return (
    <Row
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <Card
        title="Login"
        style={{
          width: 500,
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <SingnIn />
      </Card>
    </Row>
  );
};

export default Login;
