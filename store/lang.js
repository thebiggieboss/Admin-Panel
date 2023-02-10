import {getI18n} from "@/service/user";

const defaultLang = 'ru'
export const state = () => ({
  selectLang: 'ru',
  location: 1,
});

export const getters = {
  getSelectLang: (state) => {
    return state.selectLang;
  },
  getLocation: (state) => {
    return state.location;
  }
};

export const mutations = {
  setSelectLang(state, currentLang) {
    state.selectLang = currentLang
  },
  setLocation(state, location) {
    state.location = location
  },
};

export const actions = {
   async getLangInfo({ commit }, app) {
     const currentLang = this.$cookies.get("selectLang")
     try {
       const res = await getI18n();
       const isHasLang = res.data.data.content.hasOwnProperty(currentLang)
       if(!isHasLang) {
         throw ''
       }
       commit('setSelectLang', currentLang)
     }catch (e) {
       commit('setSelectLang', defaultLang)
     }

  },
  async getLocation({ commit, state }, app) {
     if(!state.location) {
       commit("setLocation", 1);
     }
  }
};
