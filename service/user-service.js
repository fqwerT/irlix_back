const insertItems = require("../utlis/SQLrequests.js").insertItems;
const findByItem = require("../utlis/SQLrequests.js").findByItem;
const returnByItems = require("../utlis/SQLrequests.js").returnByItems;
const returnByItem = require("../utlis/SQLrequests.js").returnByItem;
const returnItems = require("../utlis/SQLrequests.js").returnItems;
const db = require("../database/db.js");
const bcypt = require("bcryptjs");
const TokenService = require("./token-service.js");
const bcrypt = require("bcryptjs");

class UserService {
  static async registration(email, password, name) {
    const queryToAll = findByItem("users_list", "email");
    const queryUpload = insertItems("users_list", "email", "password", "name", "reg_data");
    const users = await db.query(queryToAll, [email]);
    const userAlreadyExist = users.rows.find((user) => user.email === email);

    if (email === undefined || name === undefined || password === undefined) {
      return { error: "Not all fields are filled in", access: false };
    }

    if (!userAlreadyExist) {
      const payload = {
        email: email,
        name: name,
      };
      const tokens = TokenService.generateToken(payload);
       const currentDate = new Date()
       const dataPayload = {
         day:currentDate.getDay(),
         month:currentDate.getMonth(),
         year:currentDate.getFullYear()
       }
      const uploaded = await db.query(queryUpload, [email, password, name, dataPayload]);
      return { access: tokens.accessToken, error: false };
    }

    if (userAlreadyExist) {
      return { error: "user with same email alredy exist!", access: false };
    }
  }

  static async GetUser(id) {
    try {
      const queryToAll = findByItem("users_list", "id");
      const users = await db.query(queryToAll, [id]);
      return users.rows;
    } catch (e) {
      return e;
    }
  }

  static async login(data) {
    const { email, password } = data;
    try {
      const queryToLogin = returnByItem("users_list", "email");
      console.log(db)
      const logineduser = (await db.query(queryToLogin, [email])).rows[0]
      if (!email || !password) {
        return { error: "incorrect fields", access: false };
      }
      if (logineduser && password !== logineduser.password) {
        return { error: "password incorrect!", access: false };
      }
      if (!logineduser) {
        return { error: "user not found!", access: false };
      }

      const payload = {
        name: logineduser.name,
        email: logineduser.email,
      };
      const tokens = TokenService.generateToken(payload);
      return {
        payload,
        access: tokens.accessToken,
        error: null,
      };
    } catch (err) {
      return err;
    }
  }
  static async getUsers() {
    try {
      const query = returnItems("users_list");
      const list = await db.query(query, []);
      return list.rows;
    } catch (err) {
      return err;
    }
  }
}

module.exports = UserService;

