const axios = require("axios");
const client = require("../db");
const crypto = require("crypto");

exports.khalti = async (req, res, next) => {
  const khaltiResponse = await axios.post(
    "https://a.khalti.com/api/v2/epayment/initiate/",
    req.body,
    {
      headers: {
        Authorization: "key live_secret_key_68791341fdd94846a146f0457ff7b455",
      },
    }
  );

  if (khaltiResponse) {
    return res.status(200).send({
      data: khaltiResponse.data,
    });
  }
  try {
  } catch (error) {
    console.log("error ", error);
  }
};
