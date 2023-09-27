import { message } from "antd";
import { useEffect, useState } from "react";
import CrudTable from "../../components/crud";
import { allTickets } from "../../service/tickets";

const columns: any = [
  {
    title: "From place",
    dataIndex: "fromplace",
    key: "fromplace",
  },
  {
    title: "To place",
    dataIndex: "toplace",
    key: "toplace",
  },
  {
    title: "Seat Count",
    dataIndex: "seatcount",
    key: "seatcount",
  },
  {
    title: "Total amount",
    dataIndex: "totalamount",
    key: "totalamount",
  },
];

const Tickets = () => {
  const [data, setData] = useState<any>([]);

  const [messageApi, contextHolder] = message.useMessage();

  const getRoutes = async () => {
    try {
      const res = await allTickets();
      if (res) {
        setData(res.data);
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
      <CrudTable cols={columns} data={data} />
    </div>
  );
};

export default Tickets;
