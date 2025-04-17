const jwt = require('jsonwebtoken')
const config = require('./config.js')
const SECRET_KEY = config.SECRET_KEY
// console.log("SECRET_KEY", SECRET_KEY)

//生成token(有效期7days)
exports.generateToken = (userId) => {
  const token = jwt.sign({
    uid: userId,
    //签发时间
    iat: Math.floor(Date.now() / 1000)
  }, SECRET_KEY, {
    expiresIn: '7d'
  })
  // 获取当前时间戳和过期时间戳
  const expiresIn = Date.now() + (7 * 24 * 60 * 60 * 1000); // 1小时后的时间戳

  return {
    token,
    expiresIn
  };
}

//验证token
exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    // 返回结构化验证结果
    return {
      isValid: true,
      uid: decoded.uid, // 用户ID
      iat: decoded.iat, // 签发时间
      exp: decoded.exp, // 过期时间
      payload: decoded // 原始payload
    };
  } catch (err) {
    // 区分不同类型的错误
    const errorType = err.name === 'TokenExpiredError' ? 'EXPIRED' : 'INVALID';

    return {
      isValid: false,
      error: errorType,
      message: err.message
    };
  }
};