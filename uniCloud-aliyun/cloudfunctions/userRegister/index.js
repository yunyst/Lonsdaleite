'use strict';
let db = uniCloud.database({
  throwOnNotFound: false
});
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;
const {
  generateToken
} = require('../common/token-util/index.js');

exports.main = async (event, context) => {
  //event为客户端上传的参数
  const {
    account,
    password
  } = event

  // 做基础非空检查
  if (!account || !password) {
    return {
      code: 400,
      message: '账号和密码不能为空'
    };
  }
  const res = await db.collection('users')
    .where({
      account
    }).count();

  if (res.total > 0) {
    return {
      code: 409,
      message: '账号已存在'
    };
  }

  const hashedPW = await bcrypt.hash(password, SALT_ROUNDS);

  await db.collection('users').add({
    account: account,
    password: hashedPW,
    accountType: account.includes('@') ? 'email' : 'phone',
    createdAt: Date.now(),
    updatedAT: Date.now()
  })
  // 为新用户生成 token
  const token = generateToken({
    account
  });

  return {
    code: 200,
    message: '注册成功',
    data: {
      token
    }
  };
};