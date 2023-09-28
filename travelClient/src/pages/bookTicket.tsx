import { message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TicketDetail from "../components/ticketDetail";
import { getRoutesById } from "../service/routes";

const BookTicket = () => {
  const params = useParams();

  const [data, setData] = useState<any>();
  console.log("🚀 ~ file: bookTicket.tsx:11 ~ BookTicket ~ data:", data);

  const [messageApi, contextHolder] = message.useMessage();

  const getRoutes = async () => {
    try {
      const res = await getRoutesById(params.id ?? "");
      if (res) {
        setData(res.data[0]);
      }
    } catch (error: any) {
      messageApi.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getRoutes();
    return () => {};
  }, []);

  return (
    <div>
      {contextHolder}
      <TicketDetail
        arrivalPlace={data?.toplace}
        arrivalTime={data?.arrival}
        busLogo="Shakira"
        busName="Shakira"
        busNumber="54545"
        depaturePlace={data?.fromplace}
        depatureTime={data?.time}
        price={data?.price}
        date={data?.date}
        type="non-stop"
        seats={data?.seats}
        routesId={data?.id}
      />
    </div>
  );
};

export default BookTicket;
