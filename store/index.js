export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async nuxtServerInit({ dispatch }, { redirect }) {
    await dispatch("lang/getLangInfo", redirect);
  }
};
