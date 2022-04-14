const express = require('express');

const categoryRouter = require("../routes/category.router");
const comentaryRouter = require("../routes/comentary.router");
const postRouter = require("../routes/post.router");
const tagRouter = require("../routes/tag.router");
const userRouter = require("../routes/user.router");
const likeRouter = require("../routes/like.router");

function routerApi(app) {

  const router = express.Router();
  app.use('/api/v1', router);

  router.use("/category",categoryRouter);
  router.use("/comentary",comentaryRouter);
  router.use("/post",postRouter);
  router.use("/user",userRouter);
  router.use("/tag",tagRouter);
  router.use("/like",likeRouter);

}

module.exports = routerApi;
