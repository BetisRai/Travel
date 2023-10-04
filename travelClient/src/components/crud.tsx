import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal, Row, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { added } from "../store/editid";

interface busTypes {
  cols: ColumnsType<any>;
  data: any[];
  addForm?: React.ReactNode | any;
  isedit?: boolean;
  isdelete?: boolean;
  deletefunc?: (id: string) => void;
}

const CrudTable = ({
  cols,
  addForm,
  data,
  isedit,
  isdelete,
  deletefunc,
}: busTypes) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const dispatch = useDispatch();

  const editHandle = (id: string) => {
    dispatch(added(id));
    setOpenModal(true);
  };

  const colAction: any = [
    {
      title: "Action",
      key: "action",
      align: "right",
      render: (_: any, record: any) => (
        <Space size="middle">
          {isedit && (
            <EditOutlined
              onClick={() => editHandle(record.id)}
              style={{ color: "blue" }}
            />
          )}

          {isdelete && (
            <DeleteOutlined
              onClick={() => {
                deletefunc && deletefunc(record.id);
              }}
              style={{ color: "red" }}
            />
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row justify={"end"}>
        {addForm && (
          <Button
            type="primary"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Add
          </Button>
        )}
      </Row>
      <br />
      <Modal
        open={openModal}
        onCancel={() => {
          setOpenModal(false);
        }}
        footer={null}
      >
        <div style={{ padding: "1rem" }}>{addForm}</div>
      </Modal>
      <Table
        columns={[...cols, ...colAction]}
        dataSource={data}
        rowKey={"id"}
      />
    </div>
  );
};

export default CrudTable;
