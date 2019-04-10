import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    durations: []
  },

  getters: {
    getRequestedDuration: (state) => (index) => {
      return state.durations[index];
    }
  },

  mutations: {
    addDuration(state, payload) {
      let index = payload.index;
      let duration = payload.duration;
      state.durations[index] = duration;
    }
  },

  actions: {
    // actions
  }
});
