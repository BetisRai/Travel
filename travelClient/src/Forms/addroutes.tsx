import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  TimePicker,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { getallbus } from "../service/bus";
import { addRoutes } from "../service/routes";

const AddRoutes = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [buses, setBuses] = useState<any>([]);

  const onFinish = async (values: any) => {
    try {
      const res = await addRoutes({
        busid: values.busid,
        date: new Date(values.date.$d).toDateString(),
        fromplace: values.fromplace,
        toplace: values.toplace,
        time: new Date(values.time.$d).toLocaleTimeString(),
        price: values.price,
        arrival: new Date(values.arrival.$d).toDateString(),
      });
      if (res) {
        messageApi.success("Routes added");
      }
    } catch (error: any) {
      messageApi.error(error.response.data.message);
    }
  };

  const getBuses = async () => {
    try {
      const res = await getallbus();
      if (res) {
        let data = res.data.map((val: any) => ({
          value: val.id,
          label: val.busname,
        }));
        setBuses(data);
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
        label="Select Bus"
        name="busid"
        rules={[
          {
            required: true,
            message: "Please Select the bus first",
          },
        ]}
      >
        <Select style={{ width: 120 }} options={buses} />
      </Form.Item>
      <Form.Item
        label="From place"
        name="fromplace"
        rules={[
          {
            required: true,
            message: "Please input from place!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="To place"
        name="toplace"
        rules={[{ required: true, message: "Please input to place" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Date"
        name="date"
        rules={[{ required: true, message: "Please input depature date" }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="Arrival date"
        name="arrival"
        rules={[{ required: true, message: "Please input depature date" }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="Time"
        name="time"
        rules={[{ required: true, message: "Please input depature time" }]}
      >
        <TimePicker />
      </Form.Item>

      <Form.Item
        label="Price per seat"
        name="price"
        rules={[{ required: true, message: "Please input to place" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Add Routes
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddRoutes;
