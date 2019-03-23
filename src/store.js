import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    playbackPercent: 0,
  },
  mutations: {
    mutatePlaybackPercent(state, percent) {
      state.playbackPercent = percent;
    }
  },
  actions: {
    updatePlaybackPercent(context, percent) {
      context.commit('mutatePlaybackPercent', percent);
    }
  },
  getters: {
    
  }
})
