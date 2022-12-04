const { Router } = require("express");
const UserModel = require("../Models/user");
const authrouter = Router();
const bcrypt = require("bcrypt");
const moment = require("moment");

authrouter.post("/user/signup", async (req, res) => {
  console.log(req.body);
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // email should not exist alreday

  const newUser = new UserModel({
    email: req.body.email,
    password: hashedPassword,
    count: 0,
    time: new moment(),
  });

  newUser
    .save()
    .then(() => {
      res.send({ code: 200, message: "Signup success" });
    })
    .catch((err) => {
      res.send({ code: 500, message: "Signup Err" });
    });
});
authrouter.post("/user/login", async (req, res) => {
  console.log(req.body.email);

  // email and password match

  UserModel.findOne({ email: req.body.email })
    .then(async (result) => {
      console.log(result, "11");
      const bcryptedData = await bcrypt.compare(
        req.body.password,
        result.password
      );
      console.log("bcryptedData", bcryptedData);

      let counter = result.count;

      if (bcryptedData) {
        res.send({
          email: result.email,
          code: 200,
          message: "user Found",
          token: "token",
        });

        const updateData = async (email) => {
          const data = await UserModel.updateOne(
            { email: email },
            { $set: { count: 0 } }
          );
          console.log(data);
        };

        updateData(result.email);
      } else if (counter >= 5) {
        const updateData = async (email) => {
          const data = await UserModel.updateOne(
            { email: email },
            { $set: { time: new moment() } }
          );
          console.log(data);
        };

        updateData(result.email);
        res.send({
          code: 201,
          message: "Too many attempts",
          time: new moment(),
        });
      } else {
        res.send({ code: 404, message: "password wrong" });
        const updateData = async (email, counter) => {
          const data = await UserModel.updateOne(
            { email: email },
            { $set: { count: counter } }
          );
          console.log(data);
        };
        counter++;
        updateData(result.email, counter);

        const updateData2 = async (email) => {
          const data = await UserModel.updateOne(
            { email: email },
            { $set: { time: new moment() } }
          );
          console.log(data);
        };

        updateData2(result.email);
      }
    })
    .catch((err) => {
      res.send({ code: 500, message: "user not found" });
    });
});

module.exports = authrouter;
