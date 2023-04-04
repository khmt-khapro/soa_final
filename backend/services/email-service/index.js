const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(cors());

app.post("/api/mail/send-mail", async (req, res) => {
  const { recipient, url } = req.body;
  const flag = await send_mail(recipient, url);

  if (flag) {
    return res.status(201).json({ flag, status: "success" });
  }
  res.status(500).json({ flag, status: "failure" });
});

// const {
//   GOOGLE_MAILER_CLIENT_ID,
//   GOOGLE_MAILER_CLIENT_SECRET,
//   GOOGLE_MAILER_REFRESH_TOKEN,
//   ADMIN_EMAIL_ADDRESS,
// } = process.env;
const PORT = process.env.PORT || 5009;
const GOOGLE_MAILER_CLIENT_ID =
  "927373112092-7r01uot5la1hep0h8t4kq055dqtskn17.apps.googleusercontent.com";
const GOOGLE_MAILER_CLIENT_SECRET = "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";
const GOOGLE_MAILER_REFRESH_TOKEN =
  "1//04xnUFbkwyI-ZCgYIARAAGAQSNwF-L9Irn1fUJDDp7EFgWlffFZVpLOUiZoSpfVohAF0oOVSC8RnLvjm3WFNCP4wV-80x-s8bT_Y";
const ADMIN_EMAIL_ADDRESS = "khavmb123@gmail.com";

const getTransporter = async () => {
  // Khởi tạo OAuth2Client với Client ID và Client Secret
  const myOAuth2Client = new OAuth2Client(
    GOOGLE_MAILER_CLIENT_ID,
    GOOGLE_MAILER_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );
  // Set Refresh Token vào OAuth2Client Credentials
  myOAuth2Client.setCredentials({
    refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
  });

  const myAccessToken = await new Promise((resolve, reject) => {
    myOAuth2Client.getAccessToken((err, token) => {
      if (err) {
        reject();
      }
      console.log(token);
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: ADMIN_EMAIL_ADDRESS,
      clientId: GOOGLE_MAILER_CLIENT_ID,
      clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
      refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
      accessToken: myAccessToken,
    },
  });

  return transporter;
};

const send_mail = async (recipient, url) => {
  try {
    const transporter = await getTransporter();
    const mailOptions = {
      from: "Testing service <khait.dev@gmail.com>",
      to: recipient,
      subject: "Forgot password",
      html: ` 
        <div>
            <p>This is reset password email</p>
            <p>Reset password in there: <a href=${url}> Click here </a> </p>
        </div>`,
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          resolve(false);
        } else {
          resolve(true);
          console.log("Email was sent >>>>>: " + info.response);
        }
      });
    });
  } catch (error) {
    console.log("error in send mail >>>>>>", error);
    throw error;
  }
};

app.listen(PORT, () =>
  console.log(`>>>>> Mail service is running on port ${PORT}.`)
);
