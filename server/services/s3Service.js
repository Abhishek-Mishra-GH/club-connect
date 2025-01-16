const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const crypto  = require('crypto')
const mime = require("mime-types")
require('dotenv').config();

const s3 = new S3Client({
  endpoint: `https://${process.env.SPACES_ENDPOINT}`,
  region: process.env.SPACES_REGION,
  credentials: {
    accessKeyId: process.env.SPACES_ACCESS_KEY,
    secretAccessKey: process.env.SPACES_SECRET_KEY,
  }
})

const uploadFileToS3 = async (buffer, mimetype, id) => {
  const fileKey = `${id}/${crypto.randomUUID()}.${mime.extension(mimetype)}`;
  const bucketName = process.env.SPACES_BUCKET_NAME;

  const uploadParams = {
    Bucket: bucketName,
    Key: fileKey,
    Body: buffer,
    ACL: "public-read",
    ContentType: mimetype,
  };

  await s3.send(new PutObjectCommand(uploadParams));
  return `https://${bucketName}.${process.env.SPACES_ENDPOINT}/${fileKey}`;
};

module.exports = { uploadFileToS3 };