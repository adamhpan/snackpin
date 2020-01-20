const axios = require("axios");

export const state = () => ({
  snacks: []
});

export const getters = {
  allSnacks(state) {
    return state.snacks;
  }
}

export const mutations = {
  setSnacks(state, snacks) {
    state.snacks = snacks;
  },
}

export const actions = {
  async getSnacks({ commit }, queryString) {
    console.log(queryString)
    let snacks = await axios.get("/api/snacks", {
      params: {
        youtuber: queryString
      }
    });

    commit("setSnacks", snacks.data);
  }
}
