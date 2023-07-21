import { Button, Form, Input } from 'antd'

const SingUp = () => {

    const onFinish = (values: signinInterface) => {
        console.log("values is ", values);
    }

    const onFinishFailed = (error: any) => {
        console.log("log error is ", error);
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
                label="Password"
                name="password"
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