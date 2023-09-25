import type { MenuProps } from "antd";
import { Layout, Menu, Modal, Space, theme } from "antd";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SingUp from "../../Forms/singUp";
import SingnIn from "../../Forms/singnIn";
import FooterLayout from "../../components/footer";
import Logo from "../../components/logo";

const { Header, Content, Footer } = Layout;

const UserHome: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
  const [signinModal, setOpenSigninModal] = useState<boolean>(false);

  const menuItems: MenuProps["items"] = [
    {
      key: "instruction",
      label: "How to buy Ticket?",
    },
    {
      key: "signin",
      label: "Sign in",
      onClick: () => {
        setOpenSigninModal(true);
      },
    },
    {
      key: "register",
      label: "Register",
      onClick: () => {
        setOpenRegisterModal(true);
      },
    },
  ];

  return (
    <Layout>
      <Space style={{ justifyContent: "space-between" }}>
        <div>
          <Logo />
        </div>
        <Header
          style={{
            display: "flex",
            alignItems: "flex-end",
            backgroundColor: "inherit",
            width: "500px",
          }}
        >
          <Menu
            mode="horizontal"
            items={menuItems}
            style={{ width: "100%", backgroundColor: "inherit" }}
          />
        </Header>
      </Space>
      <Layout>
        <Outlet />
      </Layout>

      <Modal
        open={openRegisterModal}
        footer={null}
        onCancel={() => {
          setOpenRegisterModal(false);
        }}
      >
        <div style={{ padding: "1rem" }}>
          <SingUp />
        </div>
      </Modal>

      <Modal
        open={signinModal}
        footer={null}
        onCancel={() => {
          setOpenSigninModal(false);
        }}
      >
        <div style={{ padding: "1rem" }}>
          <SingnIn />
        </div>
      </Modal>
      <Footer>
        <FooterLayout />
      </Footer>
    </Layout>
  );
};

export default UserHome;
