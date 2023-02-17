import {Logout} from "@/service/user";

export const state = () => ({
  company: undefined
});

export const getters = {

};

export const mutations = {
  setCompany(state, company) {
    state.company = company
  }
};

export const actions = {
  setUser(store, { user, access_token }) {
    this.$cookies.set('token', access_token)
  },
  async logout() {
    try {
      const logoutData = await Logout()
      window.$nuxt.$toast.open({
        message: logoutData.message,
        type: 'success',
      })
      this.$cookies.remove("token");
      await this.$router.push('/auth/login')
    } catch (e) {}
  },
  async getUserInfo({ dispatch, commit }, redirect) {
    const token = this.$cookies.get('token')
    if (!token) {
      redirect('/auth/login')
      return
    }
    const currentComp = this.$cookies.get("company")
    commit('setCompany', currentComp)
    if(!currentComp) {
      commit('setCompany', 'NLS.KZ')
    }
  },
};
