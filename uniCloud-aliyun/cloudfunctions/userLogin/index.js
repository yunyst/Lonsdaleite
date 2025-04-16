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
  // 生成Token
  const token = generateToken(user._id);

  delete user.password;
  return {
    code: 200,
    data: {
      token,
      userInfo: user
    }
  }

};