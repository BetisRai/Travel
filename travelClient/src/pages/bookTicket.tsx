import { message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TicketDetail from "../components/ticketDetail";
import { getRoutesById } from "../service/routes";

const BookTicket = () => {
  const params = useParams();

  const [data, setData] = useState<any>();

  const [messageApi, contextHolder] = message.useMessage();

  const getRoutes = async () => {
    try {
      const res = await getRoutesById(params.id ?? "");
      if (res) {
        console.log("res.data", res.data[0]);
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

  // arrival: "Wed Sep 27 2023";
  // busid: "655ad2f7-0434-4629-8e34-d21784d333d0";
  // date: "Tue Sep 26 2023";
  // fromplace: "kathmandu";
  // id: "83c2834c-5972-42a4-8808-5cb70452feae";
  // price: "2000";
  // seats: '{"0":false,"1":false,"2":false,"3":false,"4":false,"5":false,"6":false,"7":false,"8":false,"9":false}';
  // time: "5:00:00 AM";
  // toplace: "pokhara";

  return (
    <div>
      {" "}
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
        type="non-stop"
      />
    </div>
  );
};

export default BookTicket;
