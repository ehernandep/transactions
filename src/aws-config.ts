
const AWS = require("aws-sdk");


AWS.config.update({
  accessKeyId: "your-access-key",
  secretAccessKey: "your-secret-access-key",
});


AWS.config.update({
  region: "your-region",
});


const ses = new AWS.SES();

export { ses };
