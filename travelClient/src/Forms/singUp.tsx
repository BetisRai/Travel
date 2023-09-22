/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Button, Form, Input, message } from 'antd';
import { singup } from '../service/signup';

const SingUp = () => {

    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: signupInterface) => {
        if (values.password !== values.reEnterPassword) {
            void messageApi.error("Password should be same")
        }
        const res = await singup({
            password: values.password,
            reEnterPassword: values.reEnterPassword,
            userEmail: values.userEmail,
            userName: values.userName,
            active: values.active,
            role: values.role
        })

        if (res) {
            console.log("response data is", res);
        }
    }

    const onFinishFailed = (error: any) => {
        console.log("enter all the data");
    }

    return (
        <Form<signupInterface>
            name="basic"
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
                rules={[{ required: true, message: 'Please input your userEmail!' }]}
            >
                <Input type='email' />
            </Form.Item>

            <Form.Item
                label="Name"
                name="userName"
                rules={[{ required: true, message: 'Please input your Name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Create password"
                name="password"
                rules={[{ required: true, message: 'Please input your userEmail!', }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Enter password again"
                name="reEnterPassword"
                rules={[{ required: true, message: 'Please input your userEmail!', }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    )
}

export default SingUp