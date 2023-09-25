import { Button, Form, Input, message } from "antd";
import { addbus } from "../service/bus";

const AddBus = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: any) => {
    try {
      const res = await addbus({
        busname: values.busname,
        busno: values.busno,
        seats: values.seats,
      });
      if (res) {
        messageApi.success("Bus added");
      }
    } catch (error: any) {
      messageApi.error(error.response.data.message);
    }
  };

  return (
    <Form
      name="basic"
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
