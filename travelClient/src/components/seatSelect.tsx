import { Col, Row } from "antd";
import { useEffect, useState } from "react";

const SeatSelect = ({
  seats,
  getUpdateSeats,
}: {
  seats: string;
  getUpdateSeats: (seats: string) => void;
}) => {
  return (
    <DrawGrid
      seats={seats}
      getUpdateSeats={(seats: any) => {
        getUpdateSeats(seats);
      }}
    />
  );
};

export default SeatSelect;

const DrawGrid = ({
  seats,
  getUpdateSeats,
}: {
  seats: string;
  getUpdateSeats: (seats: string) => void;
}) => {
  const [data, setData] = useState<string>("");

  let currentData = data !== "" && JSON.parse(data);

  useEffect(() => {
    let temp: any = {};
    let jsondata: any;

    if (seats && seats !== "") {
      jsondata = JSON.parse(seats);
    }

    for (const key in jsondata) {
      if (jsondata[key] !== true) {
        temp[key] = jsondata[key];
      } else {
        temp[key] = "permanent";
      }
    }
    setData(JSON.stringify(temp));
    return () => {};
  }, [seats]);

  useEffect(() => {
    let currentSelected: any = {};
    let currentData = data !== "" && JSON.parse(data);

    for (const key in currentData) {
      if (currentData[key] === true) {
        currentSelected[key] = currentData[key];
      }
    }
    getUpdateSeats(currentSelected);
    return () => {};
  }, [data]);

  const onSelectSeat = (val: string) => {
    if (currentData[val] !== "permanent") {
      currentData[val] = !currentData[val];
      setData((prevvalue) =>
        JSON.stringify({ ...JSON.parse(prevvalue), ...currentData })
      );
    }
  };

  const chooseColor = (val: string) => {
    if (val === "permanent") {
      return "#ffcccb";
    } else if (val) {
      return "lightgreen";
    } else {
      return "lightgrey";
    }
  };

  return (
    <Row gutter={10}>
      {Object.keys(currentData).length > 0 &&
        Object.keys(currentData).map((val: string, index: number) => (
          <Col
            key={`${val} ${index}`}
            span={5}
            style={{
              height: "50px",
              display: "grid",
              placeItems: "center",
              boxSizing: "border-box",
              margin: "0.5rem",
              backgroundColor: chooseColor(currentData[val]),
            }}
            onClick={() => onSelectSeat(val)}
          >
            {val}
          </Col>
        ))}
    </Row>
  );
};
