import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    musicPlayerData: [],
  },
  mutations: {
    mutateRegisterPlayer(state, playerIndex) {
      let data = {
        percent: 0,
        status: 0
      }
      state.musicPlayerData[playerIndex] = data;
    },
    mutatePlaybackPercent(state, payload) {
      let index = payload.index;
      let percent = payload.percent;
      state.musicPlayerData[index].percent = percent;
    },
    mutatePlayerStatus(state, payload) {
      let index = payload.index;
      let status = payload.status;
      state.musicPlayerData[index].status = status;
    }
  },
  actions: {
    updatePlaybackPercent(context, payload) {
      context.commit('mutatePlaybackPercent', payload);
    },
    registerPlayer(context, playerIndex) {
      context.commit('mutateRegisterPlayer', playerIndex);
    },
    updatePlayerStatus(context, payload) {
      context.commit('mutatePlayerStatus', payload);
    }
  },
  getters: {
    getPlaybackProgress: (state) => (index) => {
      return state.musicPlayerData[index];
    }
  }
})
