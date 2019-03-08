interface Api {
  [key: string]: string;
}

const api: Api = {
  getCode: "getCode", // 获取验证码
  login: "login", // 登录
  homeNavList: "homeNavList", // 首页导航栏
  pageContent: "pageContent"
};

export default api;
