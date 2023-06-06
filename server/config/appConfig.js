// config/appConfig.js
require("dotenv").config();

const appConfig = {
  port: process.env.PORT || "4000",
  database: {
    uri: process.env.MONGO_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  secretKey: process.env.SECRET_KEY,
  awsS3: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    bucketName: process.env.BUCKET_NAME,
  },
};

module.exports = appConfig;
