import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { setItem } from "../localstorage/storage";
import { singin } from "../service/singnin";

const SingnIn = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const res = await singin({
        useremail: values.useremail,
        password: values.password,
      });
      if (res) {
        setItem("token", res.accessToken);
        navigate("/admin");
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
        label="userEmail"
        name="useremail"
        rules={[
          {
            required: true,
            message: "Please input your userEmail!",
            type: "email",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SingnIn;
