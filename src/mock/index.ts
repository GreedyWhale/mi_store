import { login, getCode } from "./login";
import { homeNavList } from "./home";

interface Mock {
  [key: string]: any;
}

const mock: Mock = {
  login,
  getCode,
  homeNavList
};
export default mock;
