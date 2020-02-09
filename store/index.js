const axios = require("axios");

export const state = () => ({
  snacks: [],
  savedSnacks: [],
  visibleSnacks: [],
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
    console.log("state.savedSnacks", state.savedSnacks)
    let savedSnackIds = state.savedSnacks.map((savedSnack) => {
      return savedSnack.snackId;
    })

    console.log("savedSnackIds", savedSnackIds)
    state.mapSnacks = snacks.map((snack) => {
      console.log(savedSnackIds, snack.id,  savedSnackIds.includes(snack.id))
      snack.saved = savedSnackIds.includes(snack.id);
      return snack;
    });
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
  },
  setSavedSnacks(state, snacks) {
    state.savedSnacks = snacks;
  },
  deleteSavedSnack(state, snack) {
    state.savedSnacks = state.savedSnacks.filter((savedSnack) => {
      return savedSnack.id !== snack.id
    });

    state.snacks = state.snacks.map((_snack) => {
      if(_snack.id === snack.id) {
        _snack.saved = false;
      }

      return _snack;
    })
  },
  saveSnack(state, snack) {
    state.savedSnacks.push(snack);

    state.snacks = state.snacks.map((_snack) => {
      if(_snack.id === snack.id) {
        _snack.saved = true;
      }

      return _snack;
    })
  }
}

export const actions = {
  nuxtServerInit ({ dispatch, commit }, { req }) {
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

    if(snacks.data.length) {
      commit("setMapSnacks", snacks.data);
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
  async logout({ commit }) {
    await axios.get("/api/users/logout");

    commit("logout");
  },
  async loginUser({ state, commit }, user) {
    commit("login", user);

    let savedSnacks = await axios.get(`/api/users/${state.user.id}/snacks`);

    if(savedSnacks.data.length) {
      commit("setSavedSnacks", savedSnacks.data);
    }
  },
  async login({ dispatch }, { email, password }) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.post("/api/users/login", {
          email,
          password
        });

        dispatch("loginUser", res.data);
        resolve(res.data);
      } catch(err) {
        reject(err);
      }
    })
  },
  async toggleSavedSnack({ commit, state }, snack) {
    if(!state.user) {
      throw new Error("User should be logged in")
    }

    if(snack.saved) {
      await axios.delete(`/api/users/${state.user.id}/snacks/${snack.id}`);
      commit("deleteSavedSnack", snack);
    } else {
      await axios.post(`/api/users/${state.user.id}/snacks/${snack.id}`);
      commit("saveSnack", snack);
    }
  },
  async getSavedSnacks({ commit, state }) {
    if(!state.user) return;

    let savedSnacks = await axios.get(`api/users/${state.user.id}/snacks`);

    if(savedSnacks.data.length) {
      commit("setSavedSnacks", savedSnacks.data);
    }
  }
}
