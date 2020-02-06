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
  map: null,
  user: null,
  signupError: ""
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
  },
  signupError(state) {
    return state.signupError
  },
  user(state) {
    return state.user
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
  },
  setSignupError(state, err) {
    state.signupError = err;
  },
  login(state, user) {
    state.user = user
  },
  logout(state) {
    state.user = null
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    console.log("req.session", req.user)
    if (req.user) {
      commit('login', req.user)
    }
  },

  async getMapSnacks({ commit, state }, queryString) {
    let snacks = await axios.get("/api/snacks", {
      params: {
        youtuber: queryString,
        mapBounds: state.mapBounds
      }
    });

    commit("setMapSnacks", snacks.data);
  },
  async toggleFavorite({ commit, state }, snack) {
    if(!state.user) {
      throw new Error("User should be logged in")
    }
  },
  async signup({ commit, dispatch }, { email, password }) {
    return new Promise(async (resolve) => {
      try {
        let res = await axios.post("/api/user", {
          email: email,
          password: password
        });

        dispatch("login", res.data);
        resolve(res.data)
      } catch(err) {
        commit("setSignupError", err.response.data.error);
      }
    })
  },
  localLogin({ commit }, user) {
    commit("login", user);
  },
  async logout({ commit }) {
    await axios.get("/api/user/logout");

    commit("logout");
  },
  async login({ commit }, { email, password }) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.post("/api/user/login", {
          email,
          password
        });

        commit("login", res.data);
        resolve(res.data);
      } catch(err) {
        reject(err);
      }
    })
  }
}
