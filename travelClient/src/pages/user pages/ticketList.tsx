import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Typography,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getItem } from "../../localstorage/storage";
import {
  cancelTickets,
  getTicketsByid,
  verifyCancelTickets,
} from "../../service/tickets";

const TicketList = () => {
  const [openOtp, setOpenOtp] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const [loading, setloading] = useState<boolean>(false);

  const userid = getItem("userid");

  const fetchtickets = async () => {
    try {
      const res = await getTicketsByid({
        userid: userid ?? "",
      });

      if (res.data.length > 0) {
        setData(res.data);
      }
    } catch (error: any) {
      messageApi.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchtickets();
    return () => {};
  }, []);

  const onhandlecancel = async (ticketid: string) => {
    const userid = getItem("userid");
    setloading(true);
    try {
      const res = await cancelTickets({
        ticketid: ticketid,
        userid: userid ?? "",
      });

      if (res) {
        setOpenOtp(true);
      }
      setloading(false);
    } catch (error) {}
  };

  const onhandleverify = async (values: any, ticketid: string) => {
    try {
      const res = await verifyCancelTickets({
        otp: values.otp,
        ticketid: ticketid,
      });
      if (res) {
        messageApi.success("Cancel ticket sucessfull");
      }
    } catch (error: any) {
      messageApi.error(error.response.data.message);
    }
    navigate(0);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Typography.Title level={3}>Tickets list</Typography.Title>
      {contextHolder}

      {data.length < 1 && (
        <>
          <Typography.Title level={4} style={{ color: "lightgrey" }}>
            Ticket Box Empty
          </Typography.Title>
        </>
      )}

      {data.map((val: any) => (
        <>
          <Card
            bordered={false}
            style={{
              width: "80%",
              margin: "auto",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          >
            <Row>
              <Col span={4}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography.Title level={4}>{val.fromplace}</Typography.Title>
                </div>
              </Col>
              <Col span={7} style={{ display: "grid", placeItems: "center" }}>
                <div
                  style={{
                    height: "3px",
                    width: "100%",
                    backgroundColor: "lightgrey",
                  }}
                ></div>
                <Typography.Text style={{ fontWeight: "700" }}>
                  {"Non-stop"}
                </Typography.Text>
              </Col>

              <Col span={4}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography.Title level={4}>{val.toplace}</Typography.Title>
                </div>
              </Col>
              <Col span={2} style={{ display: "grid", placeItems: "center" }}>
                <Typography.Title level={4}>Seats count</Typography.Title>
                <Typography.Text>{val.seatcount}</Typography.Text>
              </Col>
              <Col span={4} style={{ display: "grid", placeItems: "center" }}>
                <Typography.Title level={2}>
                  Rs.{val.totalamount}
                </Typography.Title>
              </Col>

              <Col span={2} style={{ display: "grid", placeItems: "center" }}>
                <Button
                  type="default"
                  htmlType="submit"
                  onClick={() => {
                    onhandlecancel(val.ticketid);
                  }}
                  loading={loading}
                >
                  Cancel Ticket
                </Button>
              </Col>
            </Row>
          </Card>

          <Modal
            open={openOtp}
            onCancel={() => {
              setOpenOtp(false);
            }}
            footer={null}
          >
            <Typography.Title level={4}>
              {"Please verify otp for cancelation."}
            </Typography.Title>

            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={(values: any) => {
                onhandleverify(values, val.ticketid);
              }}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              {/* {contextHolder} */}

              <Form.Item
                label="Otp"
                name="otp"
                rules={[{ required: true, message: "Please input your seats" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Verify otp
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          <br />
        </>
      ))}
      <br />
    </div>
  );
};

export default TicketList;
