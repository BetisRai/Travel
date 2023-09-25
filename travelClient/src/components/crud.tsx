import { Button, Modal, Row, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";

interface busTypes {
  cols: ColumnsType<any>;
  data: any[];
  addForm: React.ReactNode | any;
}

const CrudTable = ({ cols, addForm, data }: busTypes) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div>
      <Row justify={"end"}>
        <Button
          type="primary"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Add
        </Button>
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
      <Table columns={cols} dataSource={data} rowKey={"id"} />
    </div>
  );
};

export default CrudTable;
