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
  signupError: "",
  toastMsg: ""
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
  toastMsg(state) {
    return state.toastMsg
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
    let savedSnackIds = state.savedSnacks.map((savedSnack) => {
      return savedSnack.snackId;
    })

    state.mapSnacks = snacks.map((snack) => {
      console.log("snack", snack)
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
    state.user = null;

    state.mapSnacks = state.mapSnacks.map((mapSnack) => {
      mapSnack.saved = false;

      return mapSnack;
    })
  },
  setSavedSnacks(state, snacks) {
    state.savedSnacks = snacks;
  },
  deleteSavedSnack(state, snack) {
    state.savedSnacks = state.savedSnacks.filter((savedSnack) => {
      return savedSnack.id !== snack.id
    });

    state.mapSnacks = state.mapSnacks.map((_snack) => {
      if(_snack.id === snack.id) {
        _snack.saved = false;
      }

      return _snack;
    })
  },
  saveSnack(state, snack) {
    state.savedSnacks.push(snack);

    state.mapSnacks = state.mapSnacks.map((_snack) => {
      if(_snack.id === snack.id) {
        _snack.saved = true;
      }

      return _snack;
    })
  },
  toast(state, toastMsg) {
    state.toastMsg = toastMsg;
  }
}

export const actions = {
  nuxtServerInit ({ dispatch, commit }, { req }) {
    if (req.user) {
      commit('login', req.user)
    }
  },

  toast({}, toastMsg) {
    let toast = this.$toast.show(toastMsg, {
      iconPack: "fontawesome",
      action : {
        text: "CLOSE",
        onClick : (e, toastObject) => {
            toastObject.goAway(0);
        }
      },
    });

    let links = toast.el.getElementsByTagName('a');
    for(let link of links) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = e.target.getAttribute('href')

        if (href && href[0] === '/') {
          this.$router.push(href)
        } else if (this.$ga) {
          this.$ga('send', 'event', 'Outbound Link', 'click', target.href)
        }
      });
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
  async loadSavedSnacks({ state, commit }, user) {
    let savedSnacks = await axios.get(`/api/users/${state.user.id}/snacks`);

    if(savedSnacks.data.length) {
      commit("setSavedSnacks", savedSnacks.data);
    }
  },
  async login({ commit }, { email, password }) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios.post("/api/users/login", {
          email,
          password
        });

        commit("login", res.data);
        resolve(res.data);
      } catch(err) {
        reject(err);
      }
    })
  },
  async toggleSavedSnack({ dispatch, commit, state }, snack) {
    if(!state.user) {
      dispatch("toast", `<div>You need to be <a href='/login'">logged in</a> to save snacks</div>`)

      return;
    }

    if(snack.saved) {
      await axios.delete(`/api/users/${state.user.id}/snacks/${snack.id}`);

      commit("deleteSavedSnack", snack);
      dispatch("toast", `<div class="mr-auto">Snack unsaved!</div>`);
    } else {
      await axios.post(`/api/users/${state.user.id}/snacks/${snack.id}`);

      commit("saveSnack", snack);
      dispatch("toast", `<div class="mr-auto">Snack saved!</div>`);
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
