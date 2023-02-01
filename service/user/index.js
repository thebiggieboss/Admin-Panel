import axios from "axios";
import { Provider } from "@/service/base";
const authUrl = "/v1/login";
const logoutUrl = "/v1/logout";
const registerUrl = "v1/register";

function Auth(email, password) {
  return Provider.post(authUrl, {
    email,
    password,
  });
}
function Logout() {
  return Provider.post(logoutUrl);
}

function getI18n() {
  return axios.get("http://192.168.9.88:3000/api/v1/getLocale");
}
function postI18n(data) {
  return axios.post("http://192.168.9.88:3000/api/v1/getLocale", data);
}

export { Auth, Logout, getI18n, postI18n };
