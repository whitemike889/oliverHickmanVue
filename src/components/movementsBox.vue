<template>
<div class="playerMovementBoxWrapper">
  <div class="showMoreMvmts">
    <popper trigger="click" :options="popperOpts" :visible-arrow="true">
      <div class="moreMvmts popper"v-bind:style="columnsCalc">
        <div v-for="(mvmt, mvmtIndex) in mvmts"
          class="mvmt"
          v-text="mvmt.title"
          v-on:click="selectMvmt(mvmtIndex)"
        ></div>
      </div>

      <div slot="reference" class="movementButtonWrapper">
        <font-awesome icon="bars" class="movementButtonFa"/>
        <p>MOVEMENTS</p>
      </div>
    </popper>
  </div>
</div>
</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons';
// import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';

import 'animate.css/animate.min.css';
import EventBus from '../eventBus.js';

library.add(faBars)
// library.add(faAngleUp);

export default {
  components: {
    'font-awesome': FontAwesomeIcon,
    'popper': Popper
  },
  data: function() {
    return {
      popperOpts: {
        hover: false,
        placement: 'bottom',
        modifiers: {
          preventOverflow: {
            enabled: false
          },
          hide: {
            enabled: false
          }
        }
      }
    }
  },
  methods: {
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

/* wraps the button and the grid */
.playerMovementBoxWrapper {
  position: relative;
  z-index: 5;
}

.movementBoxWrapper p {
  margin-top: 0px;
  line-height: 20px;
}

.moreMvmts.popper[x-placement^="bottom"] {
  margin-top: 0px;
}

/* The MOVEMENTS button */
.movementButtonWrapper {
  /* Centers the text with fa next to it */
  margin-left: -14px;
  /* Shift it up just a little bit */
  margin-top: -7px;
  position: relative;
}

.showMoreMvmts {
  height: auto;
  position: relative;
}

.showMoreMvmts p {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  margin: 0px;
  padding-left: 5px;
  display: inline;
  cursor: pointer;
}

/* the grid wrapper */
.moreMvmts {
  display: inline-grid;
  grid-template-rows: auto;
  column-gap: 30px;
  position: relative;
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
