import { useSelector } from "react-redux";
import RoutesCard from "../components/routesCard";
import { RootState } from "../store/store";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";

const ListAvailable = () => {
  const rotuesList = useSelector((state: RootState) => state.routes.routes);
  console.log(
    "🚀 ~ file: listAvailable.tsx:7 ~ ListAvailable ~ rotuesList:",
    rotuesList
  );

  const navigate = useNavigate();

  return (
    <Row
      justify={"center"}
      align={"middle"}
      style={{ marginTop: "5rem", backgroundColor: "lightgrey" }}
    >
      <Col span={18}>
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
              navigate(`/routes/${id}`);
            }}
          />
        ))}
      </Col>
    </Row>
  );
};

export default ListAvailable;
