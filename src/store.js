import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    durations: [],
    titles: [],
    whatIsPlaying: -1
  },

  getters: {
    getRequestedDuration: (state) => (index) => {
      return state.durations[index];
    },
    getRequestedTitle: (state) => (index) => {
      return state.titles[index];
    }
  },

  mutations: {
    addDuration(state, payload) {
      let index = payload.index;
      let duration = payload.duration;
      state.durations[index] = duration;
    },
    updateWhatIsPlaying(state, index) {
      state.whatIsPlaying = index;
    },
    addTitle(state, payload) {
      let index = payload.index;
      let title = payload.title;
      state.titles[index] = title;
    }
  },

  actions: {
    // actions
  }
});
