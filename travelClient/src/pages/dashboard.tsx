import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Col, Layout, Menu, Row, theme } from 'antd';
import React, { useState } from 'react';

const { Header, Sider, Content } = Layout;

const DashboardLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider trigger={null} collapsible collapsed={collapsed} theme='light' >
                <div style={{ height: "10vh", display: "grid", placeItems: 'center', margin: 0, padding: 0 }}>
                    Travel Logo
                </div>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'Home',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'Register',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'Tickets',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Row>
                        <Col >
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                        </Col>

                        <Col offset={21}   >
                            <Avatar size={40} icon={<UserOutlined />} />
                        </Col>

                    </Row>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    Content
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
