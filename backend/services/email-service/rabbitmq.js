const amqp = require("amqplib")
const { handleSendMailActivateAccount } = require("./mailer")

const amqp_docker_url = "amqp://localhost"

const sendMessageAMQP = async ({ message, queueName }) => {
  try {
    // create connection
    const connection = await amqp.connect(amqp_docker_url)
    // create chanel
    const chanel = await connection.createChannel()
    // create queue
    await chanel.assertQueue(queueName, {
      durable: false,
    })

    // send message
    await chanel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)))
  } catch (error) {
    console.log("🚀 ~ file: rabbitmq.js:16 ~ sendMessage ~ error:", error)
  }
}

const receiveMessageAMQP = async (queueName) => {
  try {
    // create connection
    const connection = await amqp.connect(amqp_docker_url)
    // create chanel
    const chanel = await connection.createChannel()
    // create queue
    await chanel.assertQueue(queueName, {
      durable: false,
    })

    // receive message
    await chanel.consume(
      queueName,
      (message) => {
        const data = JSON.parse(message.content)
        console.log(
          "🚀 ~ file: rabbitmq.js:40 ~ receiveMessageAMQP ~ data:",
          data
        )

        // check type to send mail
        if (data.type === "activate_account") {
          handleSendMailActivateAccount(data)
        }
      },
      { noAck: true }
    )
  } catch (error) {
    console.log("🚀 ~ file: rabbitmq.js:16 ~ sendMessage ~ error:", error)
  }
}

module.exports = { sendMessageAMQP, receiveMessageAMQP }
