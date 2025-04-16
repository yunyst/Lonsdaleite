const jwt = require('jsonwebtoken')
const config = require('./config.js')
const SECRET_KEY = config.SECRET_KEY
console.log("SECRET_KEY", SECRET_KEY)

//生成token(有效期7days)
exports.generateToken = (userId) => {
  return jwt.sign({
    uid: userId,
    //签发时间
    iat: Math.floor(Date.now() / 1000)
  }, SECRET_KEY, {
    expiresIn: '7d'
  })
}

//验证token
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY)
  } catch {
    return null
  }
}