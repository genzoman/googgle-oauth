const multer = require("multer");
module.exports = function(dir, name) {
  return multer.diskStorage({
    destination: (req, files, cb) => {
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, name);
    }
  })
}
