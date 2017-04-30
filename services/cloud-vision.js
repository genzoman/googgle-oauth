const SECRETS = require("../config/secrets");
const vision = require("@google-cloud/vision")({
  projectId: "social-aggregator-165418",
  keyFilename: "/Users/darrincecil/projects/passport-google-oauth2-example/config/vision_secret.json"
});
var path = "/Users/darrincecil/projects/passport-google-oauth2-example/images/snek.jpg"
vision.detectText(path, (err, text) => {
  debugger;
});
///Users/darrincecil/projects/passport-google-oauth2-example/config/vision_secret.json
