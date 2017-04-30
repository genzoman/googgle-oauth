const express = require("express");
const visionRouter = express.Router();
const fs = require("bluebird").promisifyAll(require("fs"));
var images = fs.readdirAsync("./images");
visionRouter.get("/", (req, res) => {
  images.then(data => {
    res.render("vision", {
      files: data
    })
  })
})

module.exports = visionRouter;
///Users/darrincecil/projects/passport-google-oauth2-example/images
