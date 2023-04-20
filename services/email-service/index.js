const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const { send_mail } = require("./mailer")
const { receiveMessageAMQP } = require("./rabbitmq")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5009

app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }))
app.use(bodyParser.json({ limit: "10mb", extended: true }))
app.use(cors())

// rabbitmq receive message
receiveMessageAMQP("email_queue")

app.post("/api/mail/send-mail", async (req, res) => {
  const { recipient, url } = req.body
  const flag = await send_mail(recipient, url)

  if (flag) {
    return res.status(201).json({ flag, status: "success" })
  }
  res.status(500).json({ flag, status: "failure" })
})

app.listen(PORT, () =>
  console.log(`>>>>> Mail service is running on port ${PORT}.`)
)
