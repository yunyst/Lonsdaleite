'use strict';
const bcrypt = require('bcryptjs');
const {
  generateToken
} = require('../common/token-util/index.js');
// console.log("generateToken", generateToken)

let db = uniCloud.database({
  throwOnNotFound: false
});
exports.main = async (event, context) => {
  const {
    account,
    password
  } = event

  //user account 是否已经 existed
  const userRes = await db.collection('users').where({
    account
  }).get();

  if (userRes.data.length == 0) {
    return {
      code: 404,
      message: "账号不存在"
    }
  }

  //password if correct
  const user = userRes.data[0]
  const inValid = await bcrypt.compare(password, user.password)
  if (!inValid) {
    return {
      code: 401,
      message: '密码错误'
    }
  }
  // 生成 token 并获取过期时间
  const {
    token,
    expiresIn
  } = generateToken(user.account);

  delete user.password;
  return {
    code: 200,
    data: {
      token,
      expiresIn,
      userInfo: user.account
    }
  }

};