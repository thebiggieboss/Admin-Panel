import axios from "axios";
import { Provider } from "@/service/base";
const authUrl = "/v1/login";
const logoutUrl = "/v1/logout";
const registerUrl = "/v1/register";
const getAllNewsUrl = "/v1/news/all";
const createNewsUrl = "/v1/news/store";
const deleteNewsUrl = (id) => `/v1/news/${id}/delete`;
const updateNewsUrl = (id) => `/v1/news/${id}/update`;
const getCompanyNewsUrl = "/v1/news";
const getUrlNewsUrl = (news_url) => `/v1/news/${news_url}`;
const getAllCompanyUrl = "/v1/company/all";

const getGroupImageUrl = `/v1/group/all`;
const getImageByGroupUrl = "/v1/images/get-by-group";
const deleteImageUrl = (id) => `/v1/image/${id}/delete`;
const createImgUrl = "/v1/image/store";


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
    headers: {
      Authorization: `Bearer 89efa5d07c854c6ead808526570b85ac`,
    },
    params: {
      page
    }
  })
}
function CreateNews(data) {
  return Provider.post(createNewsUrl, data, {
    headers: {
      Authorization: `Bearer 89efa5d07c854c6ead808526570b85ac`,
    },
  },
  )
}
function DeleteNews(id) {
  return Provider.delete(deleteNewsUrl(id), {
    headers: {
      Authorization: `Bearer 89efa5d07c854c6ead808526570b85ac`,
    },

  })
}
function UpdateNews(id, data) {
  return Provider.put(updateNewsUrl(id), data, {
    headers: {
      Authorization: `Bearer 89efa5d07c854c6ead808526570b85ac`,
    },
  })
}
function GetCompanyNews(company) {
  return Provider.get(getCompanyNewsUrl, {
    headers: {
      Authorization: `Bearer 89efa5d07c854c6ead808526570b85ac`,
    },
    params: {
      company
    },
  })
}
function GetUrlNews(url) {
  return Provider.get(getUrlNewsUrl(url), {
    headers: {
      Authorization: `Bearer 89efa5d07c854c6ead808526570b85ac`,
    },
  })
}
function GetAllCompany() {
  return Provider.get(getAllCompanyUrl, {
    headers: {
      Authorization: `Bearer 89efa5d07c854c6ead808526570b85ac`,
    },
  })
}
function CreateImg(data) {
  return Provider.post(createImgUrl, data,{
    headers: {
      Authorization: `Bearer 89efa5d07c854c6ead808526570b85ac`,
    },
  })
}
function GetGroupImage() {
  return Provider.get(getGroupImageUrl, {
    headers: {
      Authorization: `Bearer 89efa5d07c854c6ead808526570b85ac`,
    },
  })
}
function GetImageByGroup(name) {
  return Provider.get(getImageByGroupUrl, {
    headers: {
      Authorization: `Bearer 89efa5d07c854c6ead808526570b85ac`,
    },
    params: {
      name
    }
  })
}
function DeleteImage(id) {
  return Provider.delete(deleteImageUrl(id), {
    headers: {
      Authorization: `Bearer 89efa5d07c854c6ead808526570b85ac`,
    },
  })
}
function getI18n() {
  return axios.get("http://192.168.9.88:3000/api/v1/getLocale");
}
function postI18n(data) {
  return axios.post("http://192.168.9.88:3000/api/v1/getLocale", data);
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
