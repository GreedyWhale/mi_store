import { login, getCode } from "./login";

interface Mock {
  [key: string]: any
}

const mock: Mock = {
  login,
  getCode
}
export default mock