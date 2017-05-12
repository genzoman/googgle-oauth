const storage = require("./storage");
let multer = require("multer")

module.exports = function() {
  let upload = multer({
    storage: storage.disk(__dirname, "newFile.txt")
  });

  return upload.single("image");
}
