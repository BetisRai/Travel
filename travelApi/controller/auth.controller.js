const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const client = require("../db");
const config = require("../config/auth.config");
const optGenerator = require("../service/otpGenerator");
const crypto = require("crypto");
const { error } = require("console");

exports.signup = async (req, res, next) => {
  try {
    const smsClient = require("twilio")(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const otpGenerated = optGenerator.generateOTP();

    const insertQuery = ` INSERT INTO users (username , useremail, password, role, otp, usernumber,id) VALUES ($1,$2,$3, $4, $5, $6,$7)`;
    const userInfo = [
      req.body.userName,
      req.body.userEmail,
      bcrypt.hashSync(req.body.password),
      req.body.role,
      otpGenerated,
      req.body.number,
      crypto.randomUUID(),
    ];

    const numberwithcode = `+977${req.body.number}`;

    const message = await smsClient.messages.create({
      body: `Your otp is ${otpGenerated}`,
      from: "+14346029065",
      to: numberwithcode,
    });

    const result = await client.query(insertQuery, userInfo);
    if (result) {
      return res.status(200).send({
        message: "Now you need to verify otp",
      });
    } else {
      return res.status(500).send({
        message: "Failed to insert into the database",
      });
    }
  } catch (error) {
    return res.status(400).send({
      message: "User not created ",
    });
  }
  next();
};

exports.signin = async (req, res, next) => {
  try {
    const userEmail = req.body.useremail;
    const reqPassword = req.body.password;

    if (!userEmail || !reqPassword) {
      return res.status(400).send({
        message: "please insert correct info",
      });
    }

    const searchUserEmailQuery = `SELECT * FROM users WHERE useremail = $1 `;
    const searchPasswordQuery = `SELECT password FROM users WHERE useremail = $1 `;
    const serachStatusQuery = `SELECT isactive FROM users WHERE useremail = $1 `;

    const searchUserEmailResult = await client.query(searchUserEmailQuery, [
      userEmail,
    ]);
    const searchUserPasswordResult = await client.query(searchPasswordQuery, [
      userEmail,
    ]);
    const searchStatusResult = await client.query(serachStatusQuery, [
      userEmail,
    ]);

    if (!searchStatusResult.rows[0].isactive) {
      return res.status(400).send({
        message: "User not activated",
      });
    }

    if (searchUserEmailResult.rows.length > 0) {
      if (searchUserPasswordResult.rows.length > 0) {
        const isPasswordValid = bcrypt.compareSync(
          reqPassword,
          searchUserPasswordResult.rows[0].password
        );

        if (!isPasswordValid) {
          return res.status(500).send({
            message: "Invalid password",
          });
        }

        const token = jwt.sign({ userEmail: userEmail }, config.secret, {
          algorithm: "HS256",
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        });

        return res.status(200).send({
          email: userEmail,
          accessToken: token,
          userType: userEmail === "super@gmail.com" ? "admin" : "user",
          data: searchUserEmailResult.rows[0],
        });
      }
    } else {
      return res.status(500).send({
        message: "user not found",
      });
    }
  } catch (error) {
    console.log("not inserted", error);
  }
  next();
};

exports.activateUser = async (req, res, next) => {
  try {
    const userEmail = req.body.useremail;
    const otp = req.body.otp;

    console.log("data", userEmail, otp);

    const activateQuery = `UPDATE users SET isactive = true WHERE useremail = $1 `;
    const getOtp = `SELECT otp FROM users WHERE useremail = $1`;
    const mainOtp = await client.query(getOtp, [userEmail]);

    if (otp !== mainOtp.rows[0].otp) {
      return res.status(400).send({
        message: "Otp not matched",
      });
    } else {
      const activate = await client.query(activateQuery, [userEmail]);
      if (activate) {
        return res.status(200).send({
          message: "User activated",
        });
      }
    }
  } catch (error) {
    console.log("not inserted", error);
  }
  next();
};
