import { createStore } from "vuex";
import { getStorage, setStorage } from "@/utils/storage";

export default createStore({
  state: {
    token: getStorage('token') || "",
    visitOrigin: '' //设备类，pc/手机
  },
  mutations: {
    setToken: (state, token) => {
      setStorage('token', token)
      state.token = token;
    },
    setVisitOrigin: (state, type) => {
      state.visitOrigin = type
    }
  },
  actions: {
     // token
    setToken({ commit }, token) {
      setStorage('token', token)
      commit('increment', token);
    },

    setVisitOrigin({ commit }, type) {
      commit('setVisitOrigin', type)
    }
  },
  modules: {}
});
