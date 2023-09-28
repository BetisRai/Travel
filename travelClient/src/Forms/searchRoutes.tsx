import {
  AutoComplete,
  Button,
  DatePicker,
  Form,
  Typography,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getallroutes, searchRoutes } from "../service/routes";
import { addRoutes } from "../store/routes";

const { Title } = Typography;

const SearchRoutes = () => {
  const [fromPlace, setFromPlace] = useState<any>([]);
  const [toPlace, setToPlace] = useState<any>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const getRoutes = async () => {
    try {
      const res = await getallroutes();
      if (res) {
        let fromplace = res.data.map((val: any) => ({
          label: val.fromplace,
          value: val.fromplace,
        }));
        let toplace = res.data.map((val: any) => ({
          label: val.toplace,
          value: val.toplace,
        }));

        const uniqueCombinationsTo: any = {};
        const uniqueCombinationsFrom: any = {};

        const uniqueTo = toplace.filter((user: any) => {
          const key = user.label + user.value;
          if (!uniqueCombinationsTo[key]) {
            uniqueCombinationsTo[key] = true;
            return true;
          }
          return false;
        });

        const uniqueFrom = fromplace.filter((user: any) => {
          const key = user.label + user.value;
          if (!uniqueCombinationsFrom[key]) {
            uniqueCombinationsFrom[key] = true;
            return true;
          }
          return false;
        });

        setToPlace(uniqueTo);
        setFromPlace(uniqueFrom);
      }
    } catch (error: any) {
      messageApi.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getRoutes();
    return () => {};
  }, []);

  const handleOnFinish = async (values: any) => {
    try {
      const res = await searchRoutes({
        date: new Date(values.date.$d).toDateString(),
        fromplace: values.fromplace,
        toplace: values.toplace,
      });

      if (res.data.length > 0) {
        dispatch(addRoutes(res.data));
        navigate("/routes");
      }
    } catch (error: any) {
      messageApi.error(error.response.data.message);
    }
  };

  return (
    <Form
      name="search"
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      layout="vertical"
      size="large"
      onFinish={handleOnFinish}
      autoComplete="off"
    >
      {contextHolder}
      <Typography.Title
        level={3}
        style={{ marginBottom: "0.5rem", color: "#ffffff" }}
      >
        From
      </Typography.Title>
      <Form.Item
        label={""}
        name="fromplace"
        rules={[
          { required: true, message: "Please input your from destination!" },
        ]}
      >
        <AutoComplete
          options={fromPlace}
          // onSelect={handleSearch}
          // onSearch={(text) => handleSearch(text)}
          placeholder="From place"
        />
      </Form.Item>

      <Typography.Title
        level={3}
        style={{ marginBottom: "0.5rem", color: "#ffffff" }}
      >
        To
      </Typography.Title>
      <Form.Item
        label=""
        name="toplace"
        rules={[
          { required: true, message: "Please input your to destination!" },
        ]}
      >
        <AutoComplete options={toPlace} placeholder="From place" />
      </Form.Item>

      <Typography.Title
        level={3}
        style={{ marginBottom: "0.5rem", color: "#ffffff" }}
      >
        Depature Date
      </Typography.Title>
      <Form.Item
        label=""
        name="date"
        rules={[
          { required: true, message: "Please input your to destination!" },
        ]}
      >
        <DatePicker
          //   defaultValue={dayjs(new Date())}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%", height: "50px" }}
        >
          <Typography.Title
            level={3}
            style={{ marginBottom: "1rem", color: "#ffffff" }}
          >
            Search
          </Typography.Title>
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SearchRoutes;
