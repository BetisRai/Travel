import { Button, DatePicker, Form, Input, Typography } from 'antd';
import dayjs from 'dayjs';

const { Title } = Typography;

const SearchRoutes = () => {
    return (
        <Form
            name="basic"
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            layout='vertical'
            size="large"
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Typography.Title level={3} style={{ marginBottom: "0.5rem", color: '#ffffff' }}>From</Typography.Title>
            <Form.Item
                label={""}
                name="from"
                rules={[{ required: true, message: 'Please input your from destination!' }]}
            >
                <Input />
            </Form.Item>

            <Typography.Title level={3} style={{ marginBottom: "0.5rem", color: '#ffffff' }}>To</Typography.Title>
            <Form.Item
                label=""
                name="to"
                rules={[{ required: true, message: 'Please input your to destination!' }]}
            >
                <Input />
            </Form.Item>

            <Typography.Title level={3} style={{ marginBottom: "0.5rem", color: '#ffffff' }}>Depature Date</Typography.Title>
            <Form.Item
                label=""
                name="to"
                rules={[{ required: true, message: 'Please input your to destination!' }]}
            >
                <DatePicker defaultValue={dayjs(new Date())} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item  >
                <Button type="primary" htmlType="submit" style={{ width: "100%", height: '50px' }}>
                    <Typography.Title level={3} style={{ marginBottom: "1rem", color: '#ffffff' }} >Search</Typography.Title>
                </Button>
            </Form.Item>
        </Form>
    )
}

export default SearchRoutes