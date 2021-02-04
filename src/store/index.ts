import { getStorage, setStorage } from "@/utils/storage";
import { createStore } from "vuex";

export default createStore({
  state: {
    token: getStorage('token') || "",
    userInfo: {},
    isDisable: 0, //是否展示维护
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
    },
    setDisable: (state, data) => {
      state.isDisable = data
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
    },

    setDisable({commit}, data) {
      commit("setDisable", data)
    }
  },
  modules: {}
});
