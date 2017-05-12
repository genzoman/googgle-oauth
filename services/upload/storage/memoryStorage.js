const multer = require("multer");

module.exports = function() {
  return multer.MemoryStorage;
}
