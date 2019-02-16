<template>
<div class="movementBoxWrapper">
  <div class="showMoreMvmts">
    <font-awesome icon="chevron-down" />
    <p v-on:click="toggleMvnts">MOVEMENTS</p>
  </div>
  <div class="moreMvmts" v-bind:style="columnsCalc" v-bind:class="[animation]">
    <div v-for="(mvmt, mvmtIndex) in mvmts"
      class="mvmt"
      v-text="mvmt.title"
      v-on:click="selectMvmt(mvmtIndex)"
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
    }
  },
  methods: {
    toggleMvnts: function() {
      this.isShowing = !this.isShowing;
    },
    //take the clicked element, find the time code, and emit the event to the EventBus
    selectMvmt: function(mvmtIndex) {
      let newTimecodeEmit = `newTimecode_${this.index}`;
      let newTimecode = this.mvmts[mvmtIndex].timecode;
      EventBus.$emit(newTimecodeEmit, newTimecode);
    }
  },
  props: ['index', 'mvmts'],
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
