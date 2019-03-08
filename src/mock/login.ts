import Mock from "mockjs";

const getCode = Mock.mock({
  data: {
    msg: "获取验证码成功",
    result: {
      code: "@natural(1000, 9999)"
    },
    stat: 1
  }
});

const login = Mock.mock({
  data: {
    msg: "登录成功",
    result: {},
    stat: 1
  }
});

export { getCode, login };
