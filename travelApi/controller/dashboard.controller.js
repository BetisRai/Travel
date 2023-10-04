const client = require("../db");

exports.getsalesdata = async (req, res, next) => {
  try {
    const insertBus = `SELECT * from tickets`;
    const busInfo = [];

    const busResult = await client.query(insertBus, []);

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

exports.getuserdata = async (req, res, next) => {
  try {
    const insertBus = `SELECT * from users where id = $1`;
    const busInfo = [];

    const busResult = await client.query(insertBus, [req.body.id]);

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
