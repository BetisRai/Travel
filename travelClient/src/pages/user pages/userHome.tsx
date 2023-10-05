import type { MenuProps } from "antd";
import { Layout, Menu, Modal, Space, message, theme } from "antd";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SingUp from "../../Forms/singUp";
import SingnIn from "../../Forms/singnIn";
import FooterLayout from "../../components/footer";
import Logo from "../../components/logo";
import { getItem, removeItem } from "../../localstorage/storage";

const { Header, Content, Footer } = Layout;

const UserHome: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const userType = getItem("user");

  const [messageApi, contextHolder] = message.useMessage();

  const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
  const [signinModal, setOpenSigninModal] = useState<boolean>(false);

  // howto

  const menuItems: MenuProps["items"] = [
    {
      key: "instruction",
      label: "How to buy Ticket?",
      onClick: () => {
        navigate(`/howto`);
      },
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
    {
      key: "tickets",
      label: "Tickets",
      disabled: userType === "user" ? false : true,
      onClick: () => {
        const userid = getItem("userid");
        navigate(`/ticketlists/${userid}`);
      },
    },
    {
      key: "logout",
      label: "Logout",
      disabled: userType === "user" ? false : true,
      onClick: () => {
        removeItem("user");
        removeItem("token");
        navigate("/");
        navigate(0);
      },
    },
  ];

  return (
    <Layout>
      <Space
        style={{
          justifyContent: "space-between",
        }}
      >
        <div
          onClick={() => {
            navigate("/");
          }}
          style={{
            cursor: "pointer",
          }}
        >
          <Logo />
        </div>
        <Header
          style={{
            display: "flex",
            alignItems: "flex-end",
            backgroundColor: "inherit",
            width: "600px",
          }}
        >
          <Menu
            mode="horizontal"
            items={menuItems}
            style={{
              width: "100%",
              backgroundColor: "inherit",
            }}
          />
        </Header>
      </Space>
      <Layout style={{ minHeight: "85vh" }}>
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

      <Footer
        style={{
          backgroundColor: "#36454F",
          color: "white",
        }}
      >
        <FooterLayout />
      </Footer>
    </Layout>
  );
};

export default UserHome;
