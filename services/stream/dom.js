const jsdom = require("jsdom");
const request = require("request");
let dom = new jsdom.JSDOM(res.body).window.document;
const through2 = require("through2");

function domStream(selectors) {
  return selectors.reduce(sel => {
    map[sel] = dom.getElementByClass(sel);
  }, {});
}
module.exports = function(selectors) {
  let map = {}
  return through2(function(chunk, enc, cb) {
    selectors.forEach(sel => {
      map[sel] = dom.getElementByClass(sel);
    });

    return map;
  });
}
