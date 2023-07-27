import { Button, Form, Input } from 'antd'

const SearchRoutes = () => {
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            layout='vertical'
            size="large"
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"

        >
            <Form.Item
                label="userEmail"
                name="useremail"
                rules={[{ required: true, message: 'Please input your userEmail!', type: 'email' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>
        </Form>
    )
}

export default SearchRoutes