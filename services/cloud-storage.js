const SECRETS = require("../config/secrets");
process.env.GCLOUD_PROJECT = SECRETS.storage.projectId;
const projectId = process.env.GCLOUD_PROJECT;
const BUCKET_NAME = "tasty-tasty-new-bucket";
var gcs = require("@google-cloud/storage")({
  projectId: projectId,
  keyFile: SECRETS.storage
});

class Bucket {
  constructor(name) {
    try {
      this.bucket_ = gcs.bucket(name);
    } catch (e) {

    }
  }

  async getFiles() {
    return await this.bucket_.getFiles();
  }

  async upload(path) {
    try {
      return await this.bucket_.upload(path);
    } catch (e) {

    }
  }

  async download(file) {
    try {

      let file_ = await this.bucket_.file(file);
      return await file_.download({
        destination: __dirname + `/${file}`
      });

    } catch (e) {

    }
  }

  async deleteFile(file) {
    try {
      let file_ = await this.bucket_.file(file);
      return await file_.delete();
    } catch (e) {

    }

  }

  static async getBuckets() {
    return await gcs.getBuckets();
  }

  static async create(bucketName) {
    return await gcs.createBucket(bucketName);
  }
}
let bucket = new Bucket(BUCKET_NAME);

