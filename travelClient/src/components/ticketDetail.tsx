import { Card, Checkbox, Col, Collapse, Divider, Row, Space, Typography } from "antd"
import { useState } from "react"


interface ticketDetailProps {
    busLogo: string
    busName: string
    busNumber: string
    type: "non-stop" | "transit"
    depatureTime: string
    depaturePlace: string
    arrivalPlace: string
    arrivalTime: string
    price: string
}

const TicketDetail = ({ busLogo, busName, arrivalTime, busNumber, depatureTime, price, type, arrivalPlace, depaturePlace }: ticketDetailProps) => {

    const [totalFare, setTotalFare] = useState<number>(Number(price));
    const [isInsuranceAdd, setIsInsuranceAdd] = useState<boolean>(false)

    const handleAddInsurance = () => {
        const temp: number = Number(totalFare) + (Number(totalFare) * 0.02);
        setIsInsuranceAdd(true)
        setTotalFare(temp)
    }

    return (
        <Row gutter={0}>
            <div style={{ width: "100%", height: '200px', backgroundColor: "#050A30", position: 'fixed' }}></div>
            <Col span={24}>
                <Typography.Title level={2} style={{ color: '#ffffff', zIndex: '1', margin: "1rem" }} >{"Complete your booking"}</Typography.Title>
            </Col>

            <Col span={18}>
                <Card bordered={false} style={{
                    margin: '1rem', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}>
                    <Row style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', padding: '1rem' }}>
                        <Col span={8}>
                            {"Bengaluru -> Mumbai"}
                        </Col>
                        <Col offset={11}>
                            <div style={{ background: "linear-gradient(to right, #c2e59c, #64b3f4)", padding: "0 0.5rem", color: '#ffffff', borderRadius: "0.1rem" }} >
                                {"Cancellation fee may apply"}
                            </div>
                        </Col>
                        <Col span={24}>
                            <Space>
                                <div style={{ backgroundColor: "#f03939", padding: "0.2rem 0.5rem", color: '#ffffff', borderRadius: "0.3rem" }}>{"Friday, 23 Jul"}</div> {"Non-stop"} {"1hr 45m"}
                            </Space>
                        </Col>
                    </Row>
                    <br />
                    <Row style={{ boxShadow: " rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", padding: '1rem' }}>
                        <Row>
                            <Col span={24}>
                                <Typography.Title level={4} style={{ zIndex: '1' }} >{"Personal details"}</Typography.Title>
                            </Col>
                            <Col span={24}>
                                <Space align="baseline">
                                    <Typography.Title level={5} style={{ zIndex: '1' }} >{"Name :"}</Typography.Title>
                                    <Typography.Paragraph style={{ zIndex: '1' }} >{"Personal details"}</Typography.Paragraph>
                                </Space>
                            </Col>
                            <Col span={24}>
                                <Space align="baseline">
                                    <Typography.Title level={5} style={{ zIndex: '1' }} >{"Address :"}</Typography.Title>
                                    <Typography.Paragraph style={{ zIndex: '1' }} >{"Personal details"}</Typography.Paragraph>
                                </Space>
                            </Col>

                            <Col span={24}>
                                <Space align="baseline">
                                    <Typography.Title level={5} style={{ zIndex: '1' }} >{"Email :"}</Typography.Title>
                                    <Typography.Paragraph style={{ zIndex: '1' }} >{"Personal details"}</Typography.Paragraph>
                                </Space>
                            </Col>

                            <Col span={24}>
                                <Space align="baseline">
                                    <Typography.Title level={5} style={{ zIndex: '1' }} >{"Contact number :"}</Typography.Title>
                                    <Typography.Paragraph style={{ zIndex: '1' }} >{"Personal details"}</Typography.Paragraph>
                                </Space>
                            </Col>
                        </Row>
                    </Row>
                    <br />
                    <Checkbox onChange={handleAddInsurance}>Add Insurance to your travel.</Checkbox>
                    <br />
                    <br />

                    <Collapse
                        items={[
                            {
                                key: '1', label: 'Check Refund policy', children: <>
                                    <p style={{ fontWeight: '600' }} >{"Only Cancellation Before 3 hourse is will be refunded."}</p>
                                    <p style={{ fontWeight: '600' }} >{"Only 60% of your total fare will be return "}</p>
                                </>
                            },
                            { key: '2', label: 'Check Insurance policy', children: <p style={{ fontWeight: '600' }} >{"In case of accident all the expenses of your recovery will be paid by our company."}</p> }
                        ]}
                    />
                </Card>
            </Col>

            <Col span={6}>
                <Card bordered={false} style={{
                    margin: '1rem', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", height: "500px"
                }}>
                    <Row>
                        <Col span={24}>
                            <Space align="baseline" style={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography.Title level={5} style={{ zIndex: '1' }} >{"Bus Fare"}</Typography.Title>
                                <Typography.Paragraph style={{ zIndex: '1' }} >{100}</Typography.Paragraph>
                            </Space>
                            {isInsuranceAdd &&
                                <Space align="baseline" style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography.Title level={5} style={{ zIndex: '1' }} >{"Insurace"}</Typography.Title>
                                    <Typography.Paragraph style={{ zIndex: '1' }} >{100 * 0.02}</Typography.Paragraph>
                                </Space>
                            }

                            <Divider style={{ borderColor: 'black' }} />

                            <Space align="baseline" style={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography.Title level={5} style={{ zIndex: '1' }} >{"Total"}</Typography.Title>
                                <Typography.Paragraph style={{ zIndex: '1' }} >{totalFare}</Typography.Paragraph>
                            </Space>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row >
    )
}

export default TicketDetail