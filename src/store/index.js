import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    openGpsModal: false,
    openLoginModal: false,
    openRegisterModal: false,
    openSendedModal: false,
    openTrackerModal: false,
    lang: localStorage.getItem('lang') || "ru",
    auth: localStorage.getItem("access_token") ? true : false,
    user: {},
    loading: false,
  },
  getters: {
    getLoading: (state) => state.loading,
    getAuth(state) {
      return state.auth;
    },
    getLang: (state) => state.lang,
    getUser: (state) => state.user,
  },
  mutations: {
     UPDATE_LANG(state, lang) {
        state.lang = lang
        localStorage.setItem("lang", lang);
    },
    SET_AUTH(state, auth) {
      state.auth = auth;
    },
    SET_USER(state, user) {
      state.user = user;
    },

    SET_LOADING(state, value) {
      state.loading = value;
    },
  },
  actions: {
    checkAuth({ commit }) {
      if (localStorage.getItem("access_token")) commit("SET_AUTH", true);
      else commit("SET_AUTH", false);
    },
    async requestUser({commit}) {
      await axios.get(`me`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
      })
      .then(response => {
        commit("SET_USER", response.data.user);
        commit("SET_AUTH", true);
      })
      .catch(error => {
        commit("SET_USER", {});
        commit("SET_AUTH", false);
        localStorage.removeItem("access_token");
        // dispatch.checkAuth()
      })
    },    
    logoutUser({ commit }) {
      localStorage.removeItem("access_token");
      commit("SET_USER", {});
      commit("SET_AUTH", false);
    },
  },
  modules: {
  }
})
