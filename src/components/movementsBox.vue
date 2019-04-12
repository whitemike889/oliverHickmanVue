<template>
<div class="movementBoxWrapper">
  <div class="showMoreMvmts" v-bind:class="{upShiftMargin: isShowing}">
    <font-awesome class="angle-up" icon="angle-up"
      v-on:click="toggleMvnts"
      v-show="isShowing"
      v-bind:class="{grow: moreGrow}"
    />
    <p v-on:click="toggleMvnts"
      v-on:mouseover="moreGrow=true"
      v-on:mouseleave="moreGrow=false"
    > MOVEMENTS </p>
    <font-awesome class="angle-down" icon="angle-down"
      v-on:click="toggleMvnts"
      v-show="!isShowing"
      v-bind:class="{grow: moreGrow}"
    />
  </div>
  <div class="moreMvmts"
    v-bind:style="columnsCalc"
    v-bind:class="[animation, {active: firstShow}, {upShiftTop: !isShowing}]"
    >
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
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


import 'animate.css/animate.min.css';
import EventBus from '../eventBus.js';

library.add(faAngleDown);
library.add(faAngleUp);

export default {
  components: {
    'font-awesome': FontAwesomeIcon
  },
  data: function() {
    return {
      isShowing: false,
      firstShow: false,
      animation: '',
      moreGrow: false
    }
  },
  methods: {
    toggleMvnts: function() {
      //hide the movements until first click
      this.firstShow = true;
      //control the animation
      this.isShowing = !this.isShowing;
    },
    //take the clicked element, find the time code, and emit the event to the EventBus
    selectMvmt: function(mvmtIndex) {
      let newTimecodeEmit = `NEW_TIMECODE_${this.index}`;
      let newTimecodeString = this.mvmts[mvmtIndex].timecode;
      let newTimecode = newTimecodeString.toSeconds();
      EventBus.$emit(newTimecodeEmit, newTimecode);
    }
  },
  props: ['index', 'mvmts'],
  watch: {
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

//convert [M]M:SS to seconds. Ripped from https://stackoverflow.com/questions/9640266/convert-hhmmss-string-to-seconds-only-in-javascript
String.prototype.toSeconds = function() {
  if (!this) return null;
  let ms = this.split(':');
  return (+ms[0]) * 60 + (+ms[1] || 0);
}
</script>

<style>
/* fa-arrows */
.angle-down {
  margin-top: -6px;
  vertical-align: 1em;
  cursor: pointer;
  transition: all 0.1s ease;
}
.angle-down:hover{
  transform:scale(1.25, 1);
}
.angle-up {
  margin-bottom: -8px;
  vertical-align: -0.125em;
  cursor: pointer;
  transition: all 0.1s ease;
  position: relative;
  top: 0;
}
.angle-up:hover{
  transform:scale(1.25, 1);
}
.grow {
  transform:scale(1.25, 1);
}

/* wraps the button and the grid */
.movementBoxWrapper {
  position: relative;
  z-index: 4;
  margin-top: 2px;
}
.movementBoxWrapper p {
  margin-top: 0px;
  line-height: 20px;
}

/* The MOVEMENTS button */
.showMoreMvmts {
  height: auto;
  position: relative;
  z-index: 2;
}

.showMoreMvmts p {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  margin: 0px;
  display: block;
  cursor: pointer;
}

/* the grid wrapper */
.moreMvmts {
  display: none;
  grid-template-rows: auto;
  column-gap: 30px;
  position: relative;
  z-index: 1;
}
.active {
  display: inline-grid;
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

/* Shift things around when you animate */
.upShiftMargin {
  margin-top: -19px;
}
.upShiftTop {
  top: -32px;
}

</style>
