const db = require("../database/db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserService = require("../service/user-service.js");
const TokenService = require("../service/token-service.js");
const { returnByItems } = require("../utlis/SQLrequests.js");

class UserModel {
  static async check(req, res) {
    const access = req.headers["authorization"];

    try {
      const query = returnByItems("users_list", "email", "name");
      const { result } = await TokenService.validationAccessToken(access);
      
      const userdata = await (
        await db.query(query, [result.email, result.name])
      ).rows;
      console.log(userdata)
      res.status(200).json({ ...result, id: userdata[0].id });
    } catch (e) {
      res.status(400).json("something went wrong");
    }
  }

  static async registration(req, res) {
    const { email, password, name } = req.body;
    const result = await UserService.registration(email, password, name);

    try {
      if (!result.access) {
        throw new Error(result.error);
      }
      if (result.access) {
        res.status(200).json({
          payload: {
            email: email,
            name: name,
            access: true,
            token: result.access,
          },
        });
      }
    } catch (e) {
      res
        .status(400)
        .json({ payload: { message: result.error, access: false } });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    const result = await UserService.login({
      email: email,
      password: password,
    });
    try {
      if (!result.access) {
        throw new Error(result.error);
      }
      if (result.access) {
        res.status(200).json({
          payload: {
            name: result.payload.name,
            email: result.payload.email,
            access: result.access,
            token: result.access,
          },
        });
      }
    } catch (e) {
      res.status(400).json({
        payload: {
          message: result.error,
          access: false,
        },
      });
    }
  }

  static async getUserByQuery(req, res) {
    try {
      const { id } = req.query;
      const check = await UserService.GetUser(id);
      res.status(200).json(check);
    } catch (e) {
      res.status(400).send("jwt expired");
    }
  }
  static async getUsersFriends(req, res) {
    try {
      const list = await UserService.getUsers();
      res.status(200).json(list);
    } catch (e) {
      res.status(400).send(e);
    }
  }
}

module.exports = UserModel;
