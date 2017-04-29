const SECRETS = require("../config/secrets");
process.env.GCLOUD_PROJECT = SECRETS.storage.projectId;
const projectId = process.env.GCLOUD_PROJECT;
const keyFile =  {
  "web": {
    private_key: "IDx2_MbJaxNIRhO-4vk22atS",
    client_email: "darrinthomascecil@gmail.com",
    "client_id": "188815661299-q262ik0t23oolcjm42l8r814qn22lhdd.apps.googleusercontent.com",
    "project_id": "social-aggregator-165418",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "IDx2_MbJaxNIRhO-4vk22atS",
    "redirect_uris": [
      "http://localhost:3000/auth/google/callback",
      "http://www.example.com/oauth2callback",
      "http://127.0.0.1"
    ]
  }
}
var gcs = require("@google-cloud/storage")({
  projectId: projectId,
  keyFile: SECRETS.storage
});

let bucket = gcs.bucket("tasty-tasty-new-bucket");
bucket.upload("../package.json", (err, data) => {
  console.log(err, data);
});

// gcs.createBucket("tasty-tasty-new-bucket", (err, bucket) => {
//   debugger;
// })
