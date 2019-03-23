import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    testState: 1
  },
  mutations: {
    mutateState(state, testValue) {
      console.log("MUTATING STATE TO THIS: ", testValue);
      state.testState = testValue;
    }
  },
  actions: {
    boostTest(context, boost) {
      let newVal = this.state.testState += boost;
      context.commit('mutateState', newVal);
    }
  },
  getters: {
    getTestState(state) {
      console.log("GETTING testState");
      return state.testState;
    }
  }
})
