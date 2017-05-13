const fs = require("fs");
const request = require("request");
const fetch = require("node-fetch");
const btoa = require("btoa");
let read = fs.createReadStream("./package.json", "utf-8");
let write = fs.createWriteStream("./results1.txt");
const through2 = require("through2");

read.pipe(through2((chunk, enc, cb) => {
  let data = chunk.toString();
  cb(null, data += "123");
}))
.pipe(write);


