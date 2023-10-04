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
    const deleteRoutes = `DELETE FROM routes WHERE busid = $1`;
    const busInfo = [req.body.id];

    const busResult = await client.query(deleteBus, busInfo);
    const routesResult = await client.query(deleteRoutes, busInfo);

    if (busResult && routesResult) {
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

exports.getbusbyid = async (req, res, next) => {
  try {
    const buses = `SELECT * FROM bus WHERE id = $1`;

    const busResult = await client.query(buses, [req.body.id]);

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

exports.addbusbyid = async (req, res, next) => {
  try {
    const insertBus = ` UPDATE  bus SET busno = $1  , busname = $2, seats = $3 WHERE id = $4 `;
    const busInfo = [
      req.body.busno,
      req.body.busname,
      req.body.seats,
      req.body.id,
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
