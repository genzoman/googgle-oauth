const fs = require("fs");
const request = require("request");
const fetch = require("node-fetch");
const btoa = require("btoa");
let read = fs.createReadStream("./package.json", "utf-8");
let write = fs.createWriteStream("./results.txt");
read.pipe(write)
