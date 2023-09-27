const axios = require("axios");
const client = require("../db");
const crypto = require("crypto");

exports.buyticket = async (req, res, next) => {
  const insertTicketQuery = ` INSERT INTO tickets (routesid , price, seatcount, totalamount, fromplace, toplace) VALUES ($1,$2,$3, $4,$5,$6)`;
  //   const routeUpdate = ` INSERT INTO routes (seats ) VALUES ($1)`;

  const routesInfo = [
    req.body.routesid,
    req.body.price,
    req.body.seatcount,
    req.body.totalamount,
    req.body.fromplace,
    req.body.toplace,
  ];

  const insertResult = await client.query(insertTicketQuery, routesInfo);
  //   const routesResult = await client.query(routeUpdate, [req.body.seats]);

  if (insertResult) {
    return res.status(200).send({
      message: "Ticket successfully reserved",
    });
  }

  try {
  } catch (error) {
    console.log("error ", error);
  }
};

exports.alltickets = async (req, res, next) => {
  const selectQuery = `SELECT * FROM tickets `;

  const selectResult = await client.query(selectQuery, []);

  if (selectResult) {
    return res.status(200).send({
      data: selectResult.rows,
    });
  }

  try {
  } catch (error) {
    console.log("error ", error);
  }
};
