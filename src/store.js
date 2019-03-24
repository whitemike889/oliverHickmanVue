import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    musicPlayerData: [],
  },
  mutations: {
    mutatePlaybackPercent(state, payload) {
      let index = payload.index;
      let percent = payload.percent;
      state.musicPlayerData[index] = percent;
    },
    mutateRegisterPlayer(state, playerIndex) {
      state.musicPlayerData[playerIndex] = 0;
    },
    mutateTest(state) {
      state.test++
    }
  },
  actions: {
    updatePlaybackPercent(context, payload) {
      context.commit('mutatePlaybackPercent', payload);
    },
    registerPlayer(context, playerIndex) {
      context.commit('mutateRegisterPlayer', playerIndex);
    },
    inc(context) {
      context.commit('mutateTest');
    }
  },
  getters: {
    getPlaybackProgress: (state) => (index) => {
      return state.musicPlayerData[index];
    }
  }
})
