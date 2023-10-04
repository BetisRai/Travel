import { Button, Form, Input, message } from "antd";
import { addbus, addbusbyid, getbusbyid } from "../service/bus";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AddBus = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const selectedId = useSelector((state: RootState) => state.edit.id);

  const getBus = async (id: string) => {
    try {
      const res = await getbusbyid(id);
      if (res) {
        form.setFieldsValue({
          ...res.data[0],
        });
      }
    } catch (error: any) {
      messageApi.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (selectedId) {
      getBus(selectedId);
    }

    return () => {};
  }, [selectedId]);

  const onFinish = async (values: any) => {
    if (selectedId) {
      try {
        const res = await addbusbyid({
          busname: values.busname,
          busno: values.busno,
          seats: values.seats,
          id: selectedId,
        });
        if (res) {
          messageApi.success("Bus added");
        }
        navigate(0);
      } catch (error: any) {
        messageApi.error(error.response.data.message);
      }
    } else {
      try {
        const res = await addbus({
          busname: values.busname,
          busno: values.busno,
          seats: values.seats,
        });
        if (res) {
          messageApi.success("Bus added");
        }
        navigate(0);
      } catch (error: any) {
        messageApi.error(error.response.data.message);
      }
    }
  };

  return (
    <Form
      name="basic"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {contextHolder}
      <Form.Item
        label="Bus no"
        name="busno"
        rules={[
          {
            required: true,
            message: "Please input your bus no!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Bus Name"
        name="busname"
        rules={[{ required: true, message: "Please input your busname!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Total Seats"
        name="seats"
        rules={[{ required: true, message: "Please input your seats" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Add bus
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddBus;
