const pool = require("../database/db");
const { returnByItem } = require("../utlis/SQLrequests");
const insertQuery = require("../utlis/SQLrequests").insertItems;
const TokenService = require("./token-service");

class UserPosts {
  static async GetPosts(access) {
    try {
      const result = await pool.query("SELECT * FROM users_post");
      return result.rows;
    } catch (e) {
      return e;
    }
  }

  static async GetPost(id) {
    try {
      const result = await pool.query(returnByItem("users_post", "id"), [id]);
      return result.rows;
    } catch (e) {
      return e;
    }
  }

  static async newPost({ title, content, date, name }) {
    try {
      const insert = `INSERT INTO users_post (title,content,date,user_name) VALUES($1, $2, $3, $4) RETURNING *`;
      const result = await pool.query(insert, [title, content, date, name]);
      return { success: true, error: null };
    } catch (e) {
      return { sucess: false, error: e };
    }
  }
}

module.exports = UserPosts;
