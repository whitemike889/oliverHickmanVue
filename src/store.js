import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    musicPlayerData: [],
  },
  mutations: {
    mutateRegisterPlayer(state, payload) {
      let data = {
        percent: 0,
        status: 0,
        duration: payload.duration
      }
      let index = payload.index;
      state.musicPlayerData[index] = data;
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
    },
    mutateDuration(state, payload) {
      let index = payload.index;
      let duration = payload.duration;
      state.musicPlayerData[index].duration = duration;
    }
  },
  actions: {
    updatePlaybackPercent(context, payload) {
      context.commit('mutatePlaybackPercent', payload);
    },
    registerPlayer(context, payload) {
      context.commit('mutateRegisterPlayer', payload);
    },
    updatePlayerStatus(context, payload) {
      context.commit('mutatePlayerStatus', payload);
    },
    updateDuration(context, payload) {
      context.commit('mutateDuration', payload);
    }
  },
  getters: {
    getRequestedDuration: (state) => (index) => {
      // console.log(state.musicPlayerData[index]);
      return state.musicPlayerData[index].duration;
    }
  }
})
