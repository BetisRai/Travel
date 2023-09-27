import { Col, Row, message } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RoutesCard from "../components/routesCard";
import { getItem } from "../localstorage/storage";
import { RootState } from "../store/store";

const ListAvailable = () => {
  const rotuesList = useSelector((state: RootState) => state.routes.routes);

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <Row
      justify={"center"}
      align={"middle"}
      style={{ marginTop: "5rem", backgroundColor: "lightgrey" }}
    >
      <Col span={18}>
        {contextHolder}
        {rotuesList.map((val: any) => (
          <RoutesCard
            arrivalPlace={val.toplace}
            depaturePlace={val.fromplace}
            busLogo="Logo"
            busName="Shakira"
            busNumber="00000"
            price={val.price ?? 0}
            type="non-stop"
            arrivalTime={val.arrival}
            depatureTime={val.date}
            id={val.id}
            onBook={(id: string) => {
              let token = getItem("token");
              if (!token) {
                messageApi.error("Please sign in first");
              } else {
                navigate(`/routes/${id}`);
              }
            }}
          />
        ))}
      </Col>
    </Row>
  );
};

export default ListAvailable;
