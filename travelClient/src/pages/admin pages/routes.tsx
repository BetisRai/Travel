import { message } from "antd";
import { useEffect, useState } from "react";
import AddRoutes from "../../Forms/addroutes";
import CrudTable from "../../components/crud";
import { getallroutes } from "../../service/routes";

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
    title: "Depature Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Depature Time",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
];

const BusRoutes = () => {
  const [data, setData] = useState<any>([]);

  const [messageApi, contextHolder] = message.useMessage();

  const getRoutes = async () => {
    try {
      const res = await getallroutes();
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
      <CrudTable cols={columns} data={data} addForm={<AddRoutes />} />
    </div>
  );
};

export default BusRoutes;
