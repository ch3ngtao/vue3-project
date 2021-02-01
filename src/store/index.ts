import { getStorage, setStorage } from "@/utils/storage";
import { createStore } from "vuex";

export default createStore({
  state: {
    token: getStorage('token') || "",
    userInfo: {},
    visitOrigin: '' //设备类，pc电脑/mobile手机
  },
  mutations: {
    setToken: (state, token) => {
      setStorage('token', token)
      state.token = token;
    },
    setVisitOrigin: (state, type) => {
      state.visitOrigin = type
    },
    setUserInfo: (state, info) => {
      state.userInfo = info
    }
  },
  actions: {
     // token
    setToken({ commit }, token) {
      setStorage('token', token)
      commit('setToken', token);
    },

    setVisitOrigin({ commit }, type) {
      commit('setVisitOrigin', type)
    },

    setUserInfo({ commit }, info) {
      commit("setUserInfo", info)
    }
  },
  modules: {}
});
