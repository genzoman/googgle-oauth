const SECRETS = require("../config/secrets");
process.env.GCLOUD_PROJECT = SECRETS.storage.projectId;
const projectId = process.env.GCLOUD_PROJECT;

const express = require('express')
  , router = express.Router()
  , request = require("request")
  , file = require("fs")
  , Bucket = require("../services/cloud-storage")("tasty-tasty-new-bucket")
  , CLOUD_BUCKET = "tasty-tasty-new-bucket";''


;
var multer = require("multer");
const diskStorage = multer.diskStorage({
  destination: (req, files, cb) => {
    cb(null, __dirname);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const cloudStorage = multer.memoryStorage({
  storage: multer.MemoryStorage
});

var upload = multer({ storage: cloudStorage });
router.get("/", (req, res, next) => {
  res.render("upload");
});

router.post('/', upload.single("image"), function (req, res, next) {
  let bucket = new Bucket("tasty-tasty-new-bucket");
  bucket.stream(req, res, next);
  res.redirect("/upload");
});

module.exports = router;
