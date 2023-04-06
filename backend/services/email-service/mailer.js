require("dotenv").config()
const nodemailer = require("nodemailer")
const { OAuth2Client } = require("google-auth-library")

const GOOGLE_MAILER_CLIENT_ID =
  "927373112092-7r01uot5la1hep0h8t4kq055dqtskn17.apps.googleusercontent.com"
const GOOGLE_MAILER_CLIENT_SECRET = "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"
const GOOGLE_MAILER_REFRESH_TOKEN =
  "1//04FyOouX4ZQ4wCgYIARAAGAQSNwF-L9Ir8ubAGz3M6msoIZ8E2hlRhsjxeO2aW_Ib25HN8_IPVYFB63QFUozXLzTOFhwnlH_AZ7I"
const ADMIN_EMAIL_ADDRESS = "khavmb123@gmail.com"

const getTransporter = async () => {
  // Khởi tạo OAuth2Client với Client ID và Client Secret
  const myOAuth2Client = new OAuth2Client(
    GOOGLE_MAILER_CLIENT_ID,
    GOOGLE_MAILER_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  )
  // Set Refresh Token vào OAuth2Client Credentials
  myOAuth2Client.setCredentials({
    refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
  })

  const myAccessToken = await new Promise((resolve, reject) => {
    myOAuth2Client.getAccessToken((err, token) => {
      if (err) {
        reject()
      }
      console.log(token)
      resolve(token)
    })
  })

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
  })

  return transporter
}

const send_mail = async (mailOptions) => {
  try {
    const transporter = await getTransporter()

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          resolve(false)
        } else {
          resolve(true)
          console.log("Email was sent >>>>>: " + info.response)
        }
      })
    })
  } catch (error) {
    console.log("error in send mail >>>>>>", error)
    throw error
  }
}

const getMailoptions = (data) => {
  const mailOptionsList = {
    activate_account: {
      from: "Mail service <khavmb123@gmail.com>",
      to: data.recipient,
      subject: "Activate account",
      html: ` 
        <div>
            <p>Please activate your account to using social app</p>
            <a style="padding: 10px 20px; border-radius: 8px; background: #346bc2; color: white"  href='http://localhost:3000/activate?token=${data.activateToken}'> Click here </a>
        </div>`,
    },
    reset_password: {
      from: "Mail service <khavmb123@gmail.com>",
      to: data.recipient,
      subject: "Forgot password",
      html: ` 
        <div>
            <p>If you are forgot your password, click the button below to create new password. If not, ignore this email</p>
            <a style="padding: 10px 20px; border-radius: 8px; background: #346bc2; color: white"  href='http://localhost:3000/forgot-password?token=${data.resetToken}'> Click here </a>
        </div>`,
    },
  }

  return mailOptionsList[data.type]
}

const handleSendMail = async (data) => {
  try {
    const mailOptions = getMailoptions(data)

    await send_mail(mailOptions)
  } catch (error) {
    console.log(
      "🚀 ~ file: mailer.js:84 ~ handleSendMailActivateAccount ~ error:",
      error
    )
  }
}

module.exports = { handleSendMail }
