import { message } from "antd";
import { useEffect, useState } from "react";
import AddBus from "../../Forms/addbus";
import CrudTable from "../../components/crud";
import { deletebus, getallbus } from "../../service/bus";
import { useNavigate } from "react-router-dom";

const columns: any = [
  {
    title: "Bus Name",
    dataIndex: "busname",
    key: "name",
  },
  {
    title: "Bus no",
    dataIndex: "busno",
    key: "busno",
  },
  {
    title: "Total seat",
    dataIndex: "seats",
    key: "seats",
  },
];

const Bus = () => {
  const [data, setData] = useState<any>([]);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const getBuses = async () => {
    try {
      const res = await getallbus();
      if (res) {
        setData(res.data);
      }
    } catch (error: any) {
      messageApi.error(error.response.data.message);
    }
  };

  const deleteBus = async (id: string) => {
    try {
      const res = await deletebus({ id: id });
      if (res) {
        messageApi.success("Deleted succesfully").then(() => {
          navigate(0);
        });
      }
    } catch (error: any) {
      messageApi.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getBuses();
    return () => {};
  }, []);

  return (
    <div>
      {contextHolder}
      <CrudTable
        cols={[...columns]}
        data={data}
        isedit
        isdelete
        deletefunc={deleteBus}
        addForm={<AddBus />}
      />
    </div>
  );
};

export default Bus;
