import {Logout} from "@/service/user";

export const state = () => ({
  // user: {},
  // token: '',
});

export const getters = {

};

export const mutations = {
  // setToken(state, token) {
  //   state.token = token
  // },
  // setUser(state, user) {
  //   state.user = { ...state.user, ...user }
  // },
};

export const actions = {
  setUser(store, { user, access_token }) {
    // store.commit('setUser', user)
    // store.commit('setToken', access_token, {
    //   path: '/',
    //   maxAge: 60 * 60 * 24 * 7,
    // })
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
  async getUserInfo({ dispatch }, redirect) {
    const token = this.$cookies.get('token')
    if (!token) {
      redirect('/auth/login')
      return
    }
    // try {
    //   dispatch('setUser', { user: user.data, access_token: token })
    // } catch (e) {
    //   this.$cookies.remove('token')
    //   redirect('/auth/login')
    // }
  },
};
