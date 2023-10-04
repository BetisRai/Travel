import { message } from "antd";
import LineChartComp from "../../components/lineChart";
import { salesdata } from "../../service/dashboard";
import { useEffect } from "react";

const AdminHome = () => {
  const [messageApi, contextHolder] = message.useMessage();

  function getDatesOfCurrentWeek() {
    const today = new Date();
    const currentDate = new Date(today);
    const dayOfWeek = today.getDay();

    currentDate.setDate(today.getDate() - dayOfWeek);

    const weekDates = [];

    for (let i = 0; i < 7; i++) {
      weekDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return weekDates;
  }

  const datesOfCurrentWeek = getDatesOfCurrentWeek();

  const getSalesData = async () => {
    try {
      const res = await salesdata();
      if (res) {
        console.log(
          "🚀 ~ file: addbus.tsx:21 ~ getBus ~ res.data[0]:",
          res.data
        );
      }
    } catch (error: any) {
      messageApi.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getSalesData();
    return () => {};
  }, []);

  return (
    <div>
      {contextHolder}
      <LineChartComp arrays={[1, 2, 3, 4, 5, 6, 7]} />
    </div>
  );
};

export default AdminHome;
