const client = require("../db");
const crypto = require("crypto");

exports.addbus = async (req, res, next) => {
  try {
    const insertBus = ` INSERT INTO bus (busno , busname, seats, id) VALUES ($1,$2,$3, $4)`;
    const busInfo = [
      req.body.busno,
      req.body.busname,
      req.body.seats,
      crypto.randomUUID(),
    ];

    const busResult = await client.query(insertBus, busInfo);

    if (busResult) {
      return res.status(200).send({
        message: "Bus Registered",
      });
    }
    next();
  } catch (error) {
    console.log("error ", error);
  }
};

exports.deletebus = async (req, res, next) => {
  try {
    const deleteBus = `DELETE FROM bus WHERE id = $1`;
    const busInfo = [req.body.id];

    const busResult = await client.query(deleteBus, busInfo);

    if (busResult) {
      return res.status(200).send({
        message: "Bus Deleted Sucessfully",
      });
    }
    next();
  } catch (error) {
    console.log("error ", error);
  }
};

exports.getallbus = async (req, res, next) => {
  try {
    const buses = `SELECT * FROM bus`;

    const busResult = await client.query(buses, []);

    if (busResult) {
      return res.status(200).send({
        data: busResult.rows,
      });
    }
    next();
  } catch (error) {
    console.log("error ", error);
  }
};
