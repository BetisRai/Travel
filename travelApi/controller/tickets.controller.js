const axios = require("axios");
const client = require("../db");
const crypto = require("crypto");
const optGenerator = require("../service/otpGenerator");

exports.buyticket = async (req, res, next) => {
  try {
    if (!req.body.userid) {
      return res.status(400).send({
        message: "Please sigin in first",
      });
    }

    const insertTicketQuery = ` INSERT INTO tickets (routesid , price, seatcount, totalamount, fromplace, toplace, userid, ticketid, date, seats) VALUES ($1,$2,$3, $4,$5,$6, $7, $8, $9, $10)`;
    const routeUpdate = ` UPDATE routes SET seats = $1 WHERE id = $2`;
    const getRoutesSeats = `SELECT seats FROM routes WHERE id = $1`;

    const routesInfo = [
      req.body.routesid,
      req.body.price,
      req.body.seatcount,
      req.body.totalamount,
      req.body.fromplace,
      req.body.toplace,
      req.body.userid,
      crypto.randomUUID(),
      new Date().toISOString(),
      req.body.seats,
    ];

    const insertResult = await client.query(insertTicketQuery, routesInfo);
    const getRoutes = await client.query(getRoutesSeats, [req.body.routesid]);

    if (insertResult && getRoutes) {
      const updatedRoutes = {
        ...JSON.parse(getRoutes.rows[0].seats),
        ...req.body.seats,
      };
      const insertUpdatedRoutes = await client.query(routeUpdate, [
        updatedRoutes,
        req.body.routesid,
      ]);
      if (insertUpdatedRoutes) {
        return res.status(200).send({
          message: "Ticket successfully reserved",
        });
      }
    }
  } catch (error) {
    console.log("error ", error);
  }
};

exports.alltickets = async (req, res, next) => {
  try {
    const selectQuery = `SELECT * FROM tickets t INNER JOIN users u ON t.userid = u.id`;

    const selectResult = await client.query(selectQuery, []);

    if (selectResult) {
      return res.status(200).send({
        data: selectResult.rows,
      });
    }
  } catch (error) {
    console.log("error ", error);
  }
};

exports.getticketsById = async (req, res, next) => {
  try {
    const selectQuery = `SELECT * FROM tickets WHERE userid = $1 `;

    const selectResult = await client.query(selectQuery, [req.body.userid]);

    if (selectResult) {
      return res.status(200).send({
        data: selectResult.rows,
      });
    }
  } catch (error) {
    console.log("error ", error);
  }
};

exports.cancelTickets = async (req, res, next) => {
  try {
    if (!req.body.userid) {
      return res.status(400).send({
        message: "User not selected",
      });
    }
    if (!req.body.ticketid) {
      return res.status(400).send({
        message: "Ticket not selected",
      });
    }

    const selectUserQuery = `SELECT * FROM users WHERE id = $1 `;
    const insertOtp = `UPDATE tickets SET cancelotp = $1 WHERE ticketid = $2`;

    const getUserDetail = await client.query(selectUserQuery, [
      req.body.userid,
    ]);

    const smsClient = require("twilio")(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    if (getUserDetail) {
      const otpGenerated = optGenerator.generateOTP();

      const optInsert = await client.query(insertOtp, [
        otpGenerated,
        req.body.ticketid,
      ]);

      if (optInsert) {
        const numberwithcode = `+977${getUserDetail.rows[0].usernumber}`;
        const message = await smsClient.messages.create({
          body: `Your otp is ${otpGenerated}`,
          from: "+14346029065",
          to: numberwithcode,
        });

        if (message) {
          return res.status(200).send({
            message: "please check your mobile phone",
          });
        }
      }
    }
  } catch (error) {
    console.log("error ", error);
  }
};

exports.verifyTicketsCancel = async (req, res, next) => {
  try {
    if (!req.body.otp) {
      return res.status(400).send({
        message: "Please enter otp",
      });
    }

    const selectRows = `SELECT * FROM tickets WHERE  cancelotp = $1`;
    const deleteRows = `DELETE FROM tickets WHERE  cancelotp = $1`;
    const routeUpdate = ` UPDATE routes SET seats = $1 WHERE id = $2`;
    const getRoutesSeats = `SELECT seats FROM routes WHERE id = $1`;

    const getTicketDetail = await client.query(selectRows, [req.body.otp]);

    if (getTicketDetail) {
      const getRoutes = await client.query(getRoutesSeats, [
        getTicketDetail.rows[0].routesid,
      ]);

      if (getRoutes) {
        let cancelSeats = JSON.parse(getTicketDetail.rows[0].seats);

        for (let key in cancelSeats) {
          cancelSeats[key] = false;
        }

        const updatedRoutes = {
          ...JSON.parse(getRoutes.rows[0].seats),
          ...cancelSeats,
        };

        const insertUpdatedRoutes = await client.query(routeUpdate, [
          updatedRoutes,
          getTicketDetail.rows[0].routesid,
        ]);

        if (insertUpdatedRoutes) {
          const cancelTicket = await client.query(deleteRows, [req.body.otp]);
          if (cancelTicket) {
            return res.status(200).send({
              message: "Verified sucessfully",
            });
          } else {
            return res.status(400).send({
              message: "Otp didn't mactched",
            });
          }
        }
      }
    }
    next();
  } catch (error) {
    console.log("error ", error);
  }
};
