const express = require("express");
const visionRouter = express.Router();
const fs = require("bluebird").promisifyAll(require("fs"));
var images = fs.readdirAsync("./images");
const vision = require("../services/cloud-vision");
visionRouter.get("/", (req, res) => {
  images.then(data => {
    res.render("vision", {
      files: data
    })
  })
});
const imageUrl = "/Users/darrincecil/projects/passport-google-oauth2-example/images/snek.jpg";
visionRouter.post("/", (req, res) => {
  vision.detectText(req.body.url, (err, text) => {
    res.send(text);
  })
});
module.exports = visionRouter;
///Users/darrincecil/projects/passport-google-oauth2-example/images
