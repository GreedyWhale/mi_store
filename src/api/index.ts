interface Api {
  [key: string]: string
}

const api: Api = {
  getCode: 'getCode',  // 获取验证码
  login: 'login'       // 登录
}

export default api