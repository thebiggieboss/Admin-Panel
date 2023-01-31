import i18n from '/static/i18n.json'
import axios from "axios";
import {getI18n} from "@/service";

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
       const isHasLang = res.data.hasOwnProperty(currentLang)
       if(!isHasLang) {
         throw ''
       }
       commit('setSelectLang', currentLang)
     }catch (e) {
       commit('setSelectLang', defaultLang)
     }
    // await axios.get('http://localhost:3000/i18n.json').then(res => {
    //   const currentLang = this.$cookies.get("selectLang")
    //   const isHasLang = res.data.hasOwnProperty(currentLang)
    //   commit('setSelectLang', isHasLang ? currentLang : defaultLang)
    // }).catch(e => {
    //   console.log(e)
    // })

  },
  async getLocation({ commit, state }, app) {
     if(!state.location) {
       commit("setLocation", 1);
     }
  }
    // const locationId = this.$cookies.get("location");
    // console.log(locationId)
    // const currentLang = this.$cookies.get("selectLang")
  //   try {
  //     // const res = await getI18n();
  //     // const checkCity = res.data[currentLang].selectCity.list.some(item => item.id === locationId)
  //     if (!checkCity) {
  //       throw Error('City not found')
  //     }
  //     commit("setLocation", locationId);
  //   } catch (e) {
  //     commit("setLocation", 2 );
  //   }
  // }

};
