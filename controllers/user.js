const User = require('../models/user');
const config = require('../config');
const axios = require('axios');

const userController = {
  login: async (ctx, next) => {
    let APPID = config.miniapp.appid;
    let SECRET = config.miniapp.secret;
    let JSCODE = ctx.request.body.code;
    let name = ctx.request.body.userInfo.nickName;
    if (!JSCODE) {
      ctx.state.data = { message: '缺少JSCODE参数' }
    }

    try {
      let data = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${JSCODE}&grant_type=authorization_code`);
      let open_id = data.data.openid;
      if (!open_id || open_id.length != 28) {
        ctx.body = ({
          code: 0,
          message: '服务器错误'
        })
        return
      }

      let userInfo = await User.select({ open_id });
      let id = userInfo[0].id;
      if (open_id === userInfo[0].open_id) {
        ctx.body = ({
          code: 200,
          message: '用户已登录，不用重新登录',
          userInfo: { name, id }
        })
        return
      }
      await User.insert({ name, id })
      ctx.body = ({
        code: 200,
        message: '登陆成功',
        userInfo: { name, id }
      })
    } catch (e) {
      ctx.body = ({
        code: 0,
        message: '登陆失败'
      })
    }
  }
}

module.exports = userController