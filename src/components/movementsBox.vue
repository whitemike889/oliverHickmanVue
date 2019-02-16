<template>
<div class="movementBoxWrapper">
  <div class="showMoreMvmts">
    <font-awesome icon="chevron-down" />
    <p v-on:click="toggleMvnts">MOVEMENTS</p>
  </div>
  <div class="moreMvmts" v-bind:style="columnsCalc" v-bind:class="[animation]">
    <div v-for="mvmt in mvmts"
      class="mvmt"
      v-text="mvmt"
      v-on:click="test"
    ></div>
  </div>
</div>
</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'animate.css/animate.min.css';
import EventBus from '../eventBus.js';

library.add(faChevronDown);

export default {
  components: {
    'font-awesome': FontAwesomeIcon
  },
  data: function() {
    return {
      isShowing: true,
      animation: '',
      player: ''
    }
  },
  methods: {
    toggleMvnts: function() {
      this.isShowing = !this.isShowing;
    },
    test: function() {
      console.log(this.player);
      this.player.currentTime = 90;
    }
  },
  mounted() {
    EventBus.$on('publishPlyr', (player) => {
      this.player = player;
    });
  },
  props: ['mvmts'],
  watch: {
    //watch isShowing and run on change
    isShowing() {
      //determine if it needs to fade in or out
      let direction = this.animation.includes('fadeInDown') ? 'fadeOutUp' : 'fadeInDown';
      this.animation = `animated faster ${direction}`;
    }
  },
  computed: {
    columnsCalc () { return `gridTemplateColumns: repeat(${this.mvmts.length}, auto)` }
  }
}
</script>

<style>
/* wraps the button and the grid */
.movementBoxWrapper {
  position: relative;
  z-index: 4;
}
.movementBoxWrapper p {
  margin-top: 0px;
  line-height: 20px;
}

/* The MOVEMENTS button */
.showMoreMvmts {
  height: 20px;
  position: relative;
  z-index: 2;
}
.showMoreMvmts p {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  display: inline-block;
  cursor: pointer;
}

/* the grid wrapper */
.moreMvmts {
  display: inline-grid;
  grid-template-rows: auto;
  column-gap: 30px;
  position: relative;
  z-index: 1;
}

/* the grid cells */
.mvmt {
  font-size: 13px;
  font-family: 'Nunito Sans', sans-serif;
  grid-row: auto;
  padding: 0px 5px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.mvmt:hover {
  background-color: #02552b;
  color: #fff;
}

</style>
