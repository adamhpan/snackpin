const axios = require("axios");

export const state = () => ({
  snacks: [],
  mapSnacks: [],
  activeSnack: null,
  mapBounds: {
    lat0: null,
    lat1: null,
    lng0: null,
    lng1: null
  },
  map: null
});

export const getters = {
  allSnacks(state) {
    return state.snacks;
  },
  mapSnacks(state) {
    return state.mapSnacks;
  },
  activeSnack(state) {
    return state.activeSnack
  }
}

export const mutations = {
  setSnacks(state, snacks) {
    state.snacks = snacks;
  },
  setMapSnacks(state, snacks) {
    state.mapSnacks = snacks;
  },
  setActiveSnack(state, snack) {
    state.activeSnack = snack;
  },
  setMapBounds(state, mapBounds) {
    state.mapBounds = mapBounds;
  }
}

export const actions = {
  async getMapSnacks({ commit, state }, queryString) {
    console.log("state.mapBounds", state.mapBounds)
    let snacks = await axios.get("/api/snacks", {
      params: {
        youtuber: queryString,
        mapBounds: state.mapBounds
      }
    });

    commit("setMapSnacks", snacks.data);
  }
}
