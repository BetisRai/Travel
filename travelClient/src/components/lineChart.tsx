import { Typography } from "antd";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface LineChartCompProps {
  arrays: [number, number, number, number, number, number, number];
}

const LineChartComp = ({ arrays }: LineChartCompProps) => {
  const data = [
    {
      name: "Sunday",
      sales: arrays[0],
    },
    {
      name: "Monday",
      sales: arrays[1],
    },
    {
      name: "Tuesday",
      sales: arrays[2],
    },
    {
      name: "Wednesday",
      sales: arrays[3],
    },
    {
      name: "Thrusday",
      sales: arrays[4],
    },
    {
      name: "Friday",
      sales: arrays[5],
    },
    {
      name: "Saturday",
      sales: arrays[6],
    },
  ];
  return (
    <div>
      <Typography.Title level={3}>{"Sales Graph"}</Typography.Title>
      <br />
      <LineChart
        title="Ticket sales"
        width={730}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default LineChartComp;
