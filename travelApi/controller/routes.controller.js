const client = require("../db");
const crypto = require("crypto");
const { generateSeats } = require("../service/seats");

exports.routes = async (req, res) => {
  try {
    const insertRouteQuery = ` INSERT INTO routes (busno , busname, fromplace, toplace, date, seats) VALUES ($1,$2,$3, $4, $5,$6)`;
    const routesInfo = [
      req.body.busno,
      req.body.busname,
      req.body.fromplace,
      req.body.toplace,
      req.body.date,
      req.body.seats,
    ];

    const searchRelativeRoutes = `SELECT * FROM routes WHERE busno=$1 AND date=$2`;
    const routesResult = await client.query(searchRelativeRoutes, [
      req.body.busno,
      req.body.date,
    ]);

    if (routesResult.rows.length > 0) {
      return res.status(400).send({
        message: "Bus route already exists",
      });
    } else {
      const result = await client.query(insertRouteQuery, routesInfo);
      if (result) {
        return res.send({
          message: "Routes Registered",
        });
      }
    }
  } catch (error) {
    console.log("error is", error);
    return res.send({
      message: "Error occured",
    });
  }
};

exports.getallRoutes = async (req, res) => {
  try {
    const getRouteQuery = `SELECT * FROM routes`;
    const allRoutesResult = await client.query(getRouteQuery, []);

    if (allRoutesResult) {
      return res.status(200).send({
        data: allRoutesResult.rows,
      });
    }
  } catch (error) {
    console.log("error is", error);
    return res.send({
      message: "Error occured",
    });
  }
};

exports.getRoutesById = async (req, res) => {
  try {
    const searchRelativeRoutes = `SELECT * FROM routes WHERE id = $1`;
    const routesResult = await client.query(searchRelativeRoutes, [
      req.body.id,
    ]);

    if (routesResult.rows.length > 0) {
      return res.status(200).send({
        data: routesResult.rows,
      });
    } else {
      return res.status(400).send({
        message: "Routes Not found",
      });
    }
  } catch (error) {
    return res.send({
      message: "Error occured",
    });
  }
};

exports.addRoutes = async (req, res, next) => {
  try {
    const addRoutesQuery = `INSERT INTO routes (id,busid,date,seats,fromplace, toplace, time, price, arrival, busname, busnumber) VALUES ($1, $2,$3,$4, $5, $6,$7,$8, $9, $10, $11)`;
    const getSeats = `SELECT seats FROM bus WHERE id = $1;`;
    const getBusSeats = await client.query(getSeats, [req.body.busid]);
    const routesInfo = [
      crypto.randomUUID(),
      req.body.busid,
      req.body.date,
      generateSeats(getBusSeats.rows[0].seats),
      req.body.fromplace,
      req.body.toplace,
      req.body.time,
      req.body.price,
      req.body.arrival,
      req.body.busname,
      req.body.busnumber,
    ];

    const routesResult = await client.query(addRoutesQuery, routesInfo);

    if (routesResult) {
      return res.status(200).send({
        message: "Routes added succesfully",
      });
    }
  } catch (error) {
    console.log("error is", error);
    return res.status(400).send({
      message: "Error occured",
    });
  }
};

exports.searchRoutes = async (req, res, next) => {
  try {
    const searchQuery = `SELECT * FROM routes WHERE fromplace = $1 AND toplace = $2 AND date = $3 ;`;
    const searchInfo = [req.body.fromplace, req.body.toplace, req.body.date];

    const routesResult = await client.query(searchQuery, searchInfo);

    if (routesResult.rows.length > 0) {
      return res.status(200).send({
        data: routesResult.rows,
      });
    } else {
      return res.status(400).send({
        message: "Routes not found",
      });
    }
  } catch (error) {
    console.log("error is", error);
    return res.status(400).send({
      message: "Error occured",
    });
  }
};

exports.addRoutesbyid = async (req, res, next) => {
  try {
    const addRoutesQuery = `UPDATE  routes SET busid = $1,date= $2,seats= $3,fromplace = $4, toplace = $5, time = $6, price= $7, arrival= $8, busname= $9, busnumber= $10  WHERE id = $11`;
    const getSeats = `SELECT seats FROM bus WHERE id = $1;`;
    const getBusSeats = await client.query(getSeats, [req.body.busid]);
    const routesInfo = [
      req.body.busid,
      req.body.date,
      generateSeats(getBusSeats.rows[0].seats),
      req.body.fromplace,
      req.body.toplace,
      req.body.time,
      req.body.price,
      req.body.arrival,
      req.body.busname,
      req.body.busnumber,
      req.body.id,
    ];

    const routesResult = await client.query(addRoutesQuery, routesInfo);

    if (routesResult) {
      return res.status(200).send({
        message: "Routes updated succesfully",
      });
    }
  } catch (error) {
    console.log("error is", error);
    return res.status(400).send({
      message: "Error occured",
    });
  }
};
