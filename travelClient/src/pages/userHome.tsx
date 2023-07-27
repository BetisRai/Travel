import type { MenuProps } from 'antd';
import { Card, Layout, Menu, Space, theme } from 'antd';
import React from 'react';
import SearchRoutes from '../Forms/searchRoutes';
import CarouselImage from '../components/carousel';
import FooterLayout from '../components/footer';
import Logo from '../components/logo';

const { Header, Content, Footer } = Layout;

const menuItems: MenuProps['items'] = [
    {
        "key": "instruction",
        "label": "How to buy Ticket?"
    },
    {
        "key": "signin",
        "label": "Sign in"
    }, {
        "key": "register",
        "label": "Register"
    }
]

const cardStyle: React.CSSProperties = {
    width: 500,
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    position: 'absolute',
    top: 60,
    right: 10,
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "16px",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    // -webkit-backdrop-filter: blur(5px),
    // // box: 0 4px 30px rgba(0, 0, 0, 0.1),

}

const UserHome: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout >
            <Space style={{ justifyContent: "space-between" }} >
                <div>
                    <Logo />
                </div>
                <Header style={{ display: 'flex', alignItems: 'flex-end', backgroundColor: "inherit", width: '500px' }}  >
                    <Menu mode="horizontal" items={menuItems} style={{ width: '100%', backgroundColor: "inherit" }} />
                </Header>

            </Space>
            <Layout>
                <Layout style={{ padding: '0 24px 24px' }}>

                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 800,
                            background: colorBgContainer,
                            position: "relative"
                        }}
                    >
                        <CarouselImage />

                        <Card style={cardStyle} >
                            <SearchRoutes />
                        </Card>

                    </Content>
                </Layout>
            </Layout>
            <Footer>
                <FooterLayout />
            </Footer>
        </Layout>
    );
};

export default UserHome;