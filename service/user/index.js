import axios from "axios";
import { Provider } from "@/service/base";
import {ServerProvider} from "@/service/serverBase";
const authUrl = "/v1/login";
const logoutUrl = "/v1/logout";
const registerUrl = "/v1/register";
const getAllNewsUrl = "/v1/site-news/all";
const createNewsUrl = "/v1/site-news/store";
const deleteNewsUrl = (id) => `/v1/site-news/${id}/delete`;
const updateNewsUrl = (id) => `/v1/site-news/${id}/update`;
const getCompanyNewsUrl = "/v1/site-news";
const getUrlNewsUrl = (news_url) => `/v1/news/${news_url}`;
const getAllCompanyUrl = "/v1/companies/all";

const getGroupImageUrl = `/v1/groups/all`;
const getImageByGroupUrl = "/v1/images/get-by-group";
const deleteImageUrl = (id) => `/v1/images/${id}/delete`;
const createImgUrl = "/v1/images/store";
const postI18nUrl = '/v1/i18-content/create'
const getI18nUrl = '/v1/i18-content/get-locale'

function Auth(email, password) {
  return Provider.post(authUrl, {
    email,
    password,
  });
}
function Logout() {
  return Provider.post(logoutUrl);
}
function GetAllNews(page) {
  return Provider.get(getAllNewsUrl, {
    params: {
      page
    }
  })
}
function CreateNews(data) {
  return Provider.post(createNewsUrl, data)
}
function DeleteNews(id) {
  return Provider.delete(deleteNewsUrl(id))
}
function UpdateNews(id, data) {
  return Provider.put(updateNewsUrl(id), data)
}
function GetCompanyNews(company) {
  return Provider.get(getCompanyNewsUrl, {
    params: {
      company
    },
  })
}
function GetUrlNews(url) {
  return Provider.get(getUrlNewsUrl(url))
}
function GetAllCompany() {
  return Provider.get(getAllCompanyUrl)
}
function CreateImg(data) {
  return Provider.post(createImgUrl, data)
}
function GetGroupImage() {
  return Provider.get(getGroupImageUrl)
}
function GetImageByGroup(name) {
  return Provider.get(getImageByGroupUrl, {
    params: {
      name
    }
  })
}
function DeleteImage(id) {
  return Provider.delete(deleteImageUrl(id))
}
function getI18n(version) {
  return Provider.get(getI18nUrl, {
    params: {
      version
    }
  })
}
function postI18n(content) {
  return Provider.post(postI18nUrl, {
      content
  })
}

export {
  Auth,
  Logout,
  getI18n,
  postI18n,
  GetAllNews,
  CreateNews,
  DeleteNews,
  UpdateNews,
  GetCompanyNews,
  GetUrlNews,
  GetAllCompany,
  CreateImg,
  GetGroupImage,
  GetImageByGroup,
  DeleteImage
};
