const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const signAccessToken = (id, role) => {
  const payload = { id, role }
  const secret = process.env.ACCESS_TOKEN_SECRET
  const options = { expiresIn: "1h" }
  return jwt.sign(payload, secret, options)
}

// const signActivateToken = (id) => {
//   const payload = { id }
//   const secret = process.env.ACTIVATE_TOKEN_SECRET
//   const options = { expiresIn: "7d" }
//   return jwt.sign(payload, secret, options)
// }

const genActivateToken = () => {
  let activateToken = crypto.randomBytes(32).toString("hex")
  activateToken = crypto
    .createHash("sha256")
    .update(activateToken)
    .digest("hex")

  const expire_at = Date.now() + 10 * 60 * 1000 // 10 minutes
  return [activateToken, expire_at]
}

module.exports = { signAccessToken, genActivateToken }
