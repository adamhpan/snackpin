let nodemailer = require("nodemailer");
let aws        = require("aws-sdk");

aws.config.update({
  accessKeyId: "AKIAZ6KN5TRYWAAA3DUU",
  secretAccessKey: "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",
  region: "us-east-1"
});

let transporter = nodemailer.createTransport({
  SES: new aws.SES({ apiVersion: "2010-12-01" })
});

module.exports = {
  transporter
};
