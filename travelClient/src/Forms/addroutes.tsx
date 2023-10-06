import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  TimePicker,
  message,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getallbus } from "../service/bus";
import { addRoutes, addRoutesByid, getRoutesById } from "../service/routes";
import { RootState } from "../store/store";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const AddRoutes = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [buses, setBuses] = useState<any>([]);
  const [busdata, setBusdata] = useState<any>([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const selectedId = useSelector((state: RootState) => state.edit.id);

  const getRoutes = async (id: string) => {
    try {
      const res = await getRoutesById(id);
      if (res) {
        form.setFieldsValue({
          ...res.data[0],
          date: moment(res.data[0].date),
          arrival: moment(res.data[0].arrival),
          time: dayjs(res.data[0].time, "h:mm:ss"),
        });
        // setSelectedValues();
      }
    } catch (error: any) {
      messageApi.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (selectedId) {
      getRoutes(selectedId);
    }

    return () => {};
  }, [selectedId]);

  const onFinish = async (values: any) => {
    const busname = busdata.filter((val: any) =>
      val.id === values.busid ? val.busname : false
    )[0].busname;

    const busno = busdata.filter((val: any) =>
      val.id === values.busid ? val.busname : false
    )[0].busno;

    if (selectedId) {
      try {
        const res = await addRoutesByid({
          busid: values.busid,
          date: new Date(values.date).toDateString(),
          fromplace: values.fromplace,
          toplace: values.toplace,
          time: new Date(values.time).toLocaleTimeString(),
          price: values.price,
          arrival: new Date(values.arrival.$d).toDateString(),
          busname: busname,
          busnumber: busno,
          id: selectedId,
        });
        if (res) {
          messageApi.success("Routes updated").then(() => {
            navigate(0);
          });
        }
      } catch (error: any) {
        messageApi.error(error.response.data.message);
      }
    } else {
      try {
        const res = await addRoutes({
          busid: values.busid,
          date: new Date(values.date.$d).toDateString(),
          fromplace: values.fromplace,
          toplace: values.toplace,
          time: new Date(values.time.$d).toLocaleTimeString(),
          price: values.price,
          arrival: new Date(values.arrival.$d).toDateString(),
          busname: busname,
          busnumber: busno,
        });
        if (res) {
          messageApi.success("Routes added").then(() => {
            navigate(0);
          });
        }
      } catch (error: any) {
        messageApi.error(error.response.data.message);
      }
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
        setBusdata(res.data);
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
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{}}
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
