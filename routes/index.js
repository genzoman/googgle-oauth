const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
let register =  (app) => {
  const files = fs.readdirAsync("./", (err, files) => {
    files.filter(file => !file.includes("index.js"))
  })
}
register();
module.exports = register;
