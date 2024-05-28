const Router = require("express").Router;
const UserModel = require("../models/user-model.js");
const UserPostsModel = require("../models/userposts-model.js");

const router = new Router();

router.post("/registration", UserModel.registration);
router.post("/login", UserModel.login);
router.get("/check", UserModel.check);
router.get("/posts", UserPostsModel.getAllPosts);
router.get("/post", UserPostsModel.getPostById);
router.post("/createpost", UserPostsModel.createPost);
router.get("/user", UserModel.getUserByQuery);
router.get("/friends", UserModel.getUsersFriends);

module.exports = router;
