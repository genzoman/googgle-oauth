var express = require('express')
  , router = express.Router()

var multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, files, cb) => {
    cb(null, __dirname);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });
router.get("/", (req, res, next) => {
  res.render("upload");
})
router.post('/', upload.any(), function (req, res) {
  res.redirect("/");
});
module.exports = router;
