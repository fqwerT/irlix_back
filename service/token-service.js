const jwt = require("jsonwebtoken");
const findByItem = require("../utlis/SQLrequests.js").findByItem;
const updateItem = require("../utlis/SQLrequests.js").updateItem;
const db = require("../database/db.js");

class TokenService {
  static generateToken(payload) {
    const accessToken = jwt.sign(
      { name: payload.name, email: payload.email },
      process.env.JWT_ACCESS_TOKEN,
      { expiresIn: "3430000s" }
    );
    const refreshToken = jwt.sign(
      { name: payload.name, email: payload.email },
      process.env.JWT_REFRESH_TOKEN,
      { expiresIn: "120s" }
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  static async saveAccessToken(id, accessToken) {
    const queryUpdate = updateItem("users_list", "access_token", "id");
    const res = await db.query(queryUpdate, [accessToken, id]);
    if (res.rowCount > 0) {
      return accessToken;
    } else {
      return undefined;
    }
  }

  static validationAccessToken(accessToken) {
    return {result:jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN)}
  }

  static validationRefreshToken(refreshToken) {
    const validationToken = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN
    );

    return validationToken;
  }
}

module.exports = TokenService;
