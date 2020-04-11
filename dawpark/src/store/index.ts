import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const SET_WINDOW_SIZE = 'SET_WINDOW_SIZE';

export default new Vuex.Store({
  state: {
    windowSize: 'lg',
  },
  mutations: {
    [SET_WINDOW_SIZE]: (state, size) => {
      state.windowSize = size;
    },
  },
  actions: {
    [SET_WINDOW_SIZE]: ({ commit }, size) => {
      commit('SET_WINDOW_SIZE', size);
    },
  },
  modules: {},
});
