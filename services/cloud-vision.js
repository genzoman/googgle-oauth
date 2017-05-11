const SECRETS = require("../config/secrets");
const vision = require("@google-cloud/vision")({
  projectId: "social-aggregator-165418",
  keyFilename: "/Users/darrincecil/projects/passport-google-oauth2-example/config/vision_secret.json"
});

module.exports = vision;
const url = `http://i1.kym-cdn.com/photos/images/newsfeed/001/017/919/f4d.jpg`;

// vision.detectText(url)
//   .then(data => {
//     ;
//   });
