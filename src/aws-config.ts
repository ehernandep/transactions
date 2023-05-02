const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWSKEY,
  secretAccessKey: process.env.SECRETAWSKEY,
});

AWS.config.update({
  region: "us-east-1",
});

const ses = new AWS.SES();

export { ses };
