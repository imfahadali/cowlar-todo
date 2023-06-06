const AWS = require("aws-sdk");
const fileupload = require("express-fileupload");
const express = require("express");

const { processFileForUpload } = require("../utils/helperFunctions");
const { awsS3 } = require("../config/appConfig");
require("dotenv").config();

const app = express();

const allowedImageFormats = ["png", "jpg"];

app.use(
  fileupload({
    createParentPath: true,
  })
);

const s3 = new AWS.S3({
  region: "eu-west-2",
  accessKeyId: awsS3.accessKeyId,
  secretAccessKey: awsS3.secretAccessKey,
  signatureVersion: "v4",
});

exports.upload = async (req, res) => {
  const filePath = req.body.img.path;
  const fileExtension = (
    filePath.substring(filePath.lastIndexOf(".") + 1) + ""
  ).toLowerCase();
  console.log(fileExtension);
  const uploadOptions = {
    fileName: req.body.name,
    fileType: fileExtension,
  };
  if (allowedImageFormats.includes(fileExtension)) {
    const params = processFileForUpload(req.body.img, uploadOptions); // Process and Retrieve the params for S3.upload function
    console.log(params);
    let location = "";
    let key = "";
    try {
      const { Location, Key } = await s3.upload(params).promise();
      location = Location;
      key = Key;

      res.send({ location, key });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err });
    }
  } else {
    res.send("File Format not supported");
  }
};
