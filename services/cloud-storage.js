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

  file(fileName) {
    return this.bucket_.file(fileName);
  }

  stream(req, res, next) {
    function getPublicUrl(filename) {
      return `https://storage.googleapis.com/${BUCKET_NAME}/${filename}`;
    }
    if (!req.file) {
      return next();
    }

    const gcsname = Date.now() + req.file.originalname;
    const file = this.bucket_.file(gcsname);

    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    });

    stream.on('error', (err) => {
      req.file.cloudStorageError = err;
      next(err);
    });

    stream.on('finish', () => {
      req.file.cloudStorageObject = gcsname;
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
      next();
    });

    stream.end(req.file.buffer);
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
module.exports = Bucket;
