const AWS = require("aws-sdk");
require("dotenv").config();

const s3 = new AWS.S3({
  region: "eu-west-2",
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
});

exports.upload = async (req, res) => {
  console.log("running uplaod controller \n");

  const { imgBase64, name } = req.body;

  const base64Data = new Buffer.from(
    imgBase64.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const type = imgBase64.split(";")[0].split("/")[1];
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: name,
    Body: base64Data,
    ContentEncoding: "base64",
    ContentType: `image/${type}`,
  };

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
  // res.status.send(req)
  // res.send(allUsers);
};
