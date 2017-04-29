var express = require('express')
  , router = express.Router()

var multer = require("multer");
var upload = multer({ dest: "uploads/"})
router.get("/", (req, res, next) => {
  res.render("upload");
})
router.post('/', upload.any(), function(req, res) {
  res.send(req.files);
});
module.exports = router;
