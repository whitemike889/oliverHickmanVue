import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    durations: [],
    whatIsPlaying: -1
  },

  getters: {
    getRequestedDuration: (state) => (index) => {
      return state.durations[index];
    },
  },

  mutations: {
    addDuration(state, payload) {
      let index = payload.index;
      let duration = payload.duration;
      state.durations[index] = duration;
    },
    updateWhatIsPlaying(state, index) {
      state.whatIsPlaying = index;
    }
  },

  actions: {
    // actions
  }
});
