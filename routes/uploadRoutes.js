const SECRETS = require("../config/secrets");
const upload = require("../services/upload")
process.env.GCLOUD_PROJECT = SECRETS.storage.projectId;
const projectId = process.env.GCLOUD_PROJECT;

const express = require('express')
  , router = express.Router()
  , request = require("request")
  , file = require("fs")
  , Bucket = require("../services/cloud-storage")
  , CLOUD_BUCKET = "tasty-tasty-new-bucket";

router.get("/", (req, res, next) => {
  res.render("upload");
});

router.post('/', upload("image"), function (req, res, next) {
  let bucket = new Bucket("tasty-tasty-new-bucket");
  bucket.stream(req, res, next);
  res.redirect("/upload");
});

module.exports = router;
