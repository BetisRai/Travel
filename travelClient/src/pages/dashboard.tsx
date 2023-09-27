import {
  CarOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SnippetsOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Layout, Menu, Row, Space, theme } from "antd";
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { removeItem } from "../localstorage/storage";

const { Header, Sider, Content } = Layout;

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div
          style={{
            height: "10vh",
            display: "grid",
            placeItems: "center",
            margin: 0,
            padding: 0,
          }}
        >
          Travel Logo
        </div>
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: (
                <Link to="/admin/home">
                  <UserOutlined />
                </Link>
              ),
              label: "Home",
            },
            {
              key: "2",
              icon: (
                <Link to="/admin/registerbus">
                  <CarOutlined />
                </Link>
              ),
              label: "Register Bus",
            },
            {
              key: "3",
              icon: (
                <Link to="/admin/registerroutes">
                  <UploadOutlined />
                </Link>
              ),
              label: "Register Routes",
            },
            {
              key: "4",
              icon: (
                <Link to="/admin/tickets">
                  <SnippetsOutlined />
                </Link>
              ),
              label: "Tickets",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Row>
            <Col>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </Col>

            <Col offset={21}>
              <Button
                type="default"
                onClick={() => {
                  removeItem("token");
                  navigate("/");
                }}
              >
                <Space>
                  Logout
                  <LogoutOutlined />
                </Space>
              </Button>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
