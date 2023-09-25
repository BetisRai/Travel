import { DeleteOutlined } from "@ant-design/icons";
import { Space, message } from "antd";
import { useEffect, useState } from "react";
import AddBus from "../../Forms/addbus";
import CrudTable from "../../components/crud";
import { deletebus, getallbus } from "../../service/bus";

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

  const [messageApi, contextHolder] = message.useMessage();

  const colAction = [
    {
      title: "Action",
      key: "action",
      align: "right",
      render: (_: any, record: any) => (
        <Space size="middle">
          <DeleteOutlined
            onClick={() => deleteBus(record.id)}
            style={{ color: "red" }}
          />
        </Space>
      ),
    },
  ];

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
        messageApi.success("Deleted succesfully");
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
        cols={[...columns, ...colAction]}
        data={data}
        addForm={<AddBus />}
      />
    </div>
  );
};

export default Bus;
