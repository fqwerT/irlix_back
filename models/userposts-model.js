const UserPosts = require("../service/posts-service");

class UserPostsModel {
  static async getAllPosts(req, res) {
    const access = req.headers["authorization"] || undefined;
    try {
      res.status(200).json(await UserPosts.GetPosts(access));
    } catch (e) {
      res.status(400).json("something went wrong!");
    }
  }

  static async createPost(req, res) {
    const { content,  name, title } = req.body;

    try {
      const currentDate = new Date();

      const date = `${currentDate.getDate()}.${currentDate.getMonth()}.${currentDate.getFullYear()}`;
      const result = await UserPosts.newPost({
        title,
        content,
        date,
        name,
    });
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json(e.message);
    }
  }

  static async getPostById(req, res) {
    const { id } = req.query;
    try {
      res.status(200).json(await UserPosts.GetPost(id));
    } catch (e) {
      res.status(400).json(e.message);
    }
  }
}

module.exports = UserPostsModel;
