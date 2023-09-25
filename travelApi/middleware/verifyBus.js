const client = require("../db");

const checkDuplicateBusno = async (req, res, next) => {
  try {
    const busno = req.body.busno;

    const searchBusNameQuery = `SELECT busno FROM bus WHERE busno = $1 `;

    const busResult = await client.query(searchBusNameQuery, [busno]);

    if (busResult.rows.length > 0) {
      return res.status(400).send({
        message: "Bus already exists",
      });
    } else {
      next();
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const verifyBus = {
  checkDuplicateBusno: checkDuplicateBusno,
};

module.exports = verifyBus;
