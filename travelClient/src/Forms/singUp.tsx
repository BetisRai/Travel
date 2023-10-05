/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Button, Form, Input, Modal, message } from "antd";
import { singup } from "../service/signup";
import { useState } from "react";
import { verifyOtp } from "../service/verifyOtp";
import { useNavigate } from "react-router-dom";

const SingUp = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [userEmail, setUserEmail] = useState<string>("");
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const onFinish = async (values: signupInterface) => {
    setloading(true);
    try {
      if (values.password !== values.reEnterPassword) {
        messageApi.error("Password should be same");
        return;
      }
      const res = await singup({
        password: values.password,
        reEnterPassword: values.reEnterPassword,
        userEmail: values.userEmail,
        userName: values.userName,
        number: values.number,
        active: false,
        role: "user",
        address: values.address,
      });

      if (res) {
        setUserEmail(values.userEmail);
        messageApi.success(res.message);
        setOpenOtp(true);
        setloading(false);
      }
    } catch (error: any) {
      messageApi.error(error.response.data.message);
      setloading(false);
    }
  };

  const onSubmitOtp = async (values: any) => {
    try {
      const res = await verifyOtp({
        otp: values.otp,
        useremail: userEmail,
      });

      if (res) {
        messageApi.success("Activated successfully");
        setOpenOtp(false);
        navigate(0);
      }
    } catch (error: any) {
      messageApi.error(error.response.data.message);
    }
  };

  const onFinishFailed = (error: any) => {};

  const [openOtp, setOpenOtp] = useState<boolean>(false);

  return (
    <>
      <Form<signupInterface>
        name="signup"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {contextHolder}
        <Form.Item
          label="User Email"
          name="userEmail"
          rules={[{ required: true, message: "Please input your userEmail!" }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Name"
          name="userName"
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contact Number"
          name="number"
          rules={[
            { required: true, message: "Please input your contact number!" },
          ]}
        >
          <Input maxLength={10} minLength={10} />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Create password"
          name="password"
          rules={[{ required: true, message: "Please input your userEmail!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Enter password again"
          name="reEnterPassword"
          rules={[{ required: true, message: "Please input your userEmail!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
        </Form.Item>
      </Form>

      <Modal
        open={openOtp}
        onCancel={() => {
          //   setOpenOtp(false);
        }}
        footer={null}
      >
        <Form<any>
          name="otp"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onSubmitOtp}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {contextHolder}
          <div style={{ padding: "1rem" }}>
            <Form.Item
              label="Enter otp"
              name="otp"
              rules={[
                { required: true, message: "Please input your userEmail!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Verify Otp
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default SingUp;
