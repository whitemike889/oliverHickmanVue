<template>
  <div class="playbackWrapper">
    <div class="playbackControls">
      <div class="controlWrapper play-pause">
        <font-awesome v-show="!playStatus" icon="play" class="fa" @click="togglePlayStatus"/>
      </div>
      <div class="controlWrapper play-pause">
        <font-awesome v-show="playStatus" icon="pause" class="fa" @click="togglePlayStatus"/>
      </div>
    </div> <!-- end controlWrapper -->
    <div class="playbackTitle">
      <popper trigger="click" :options="popperOpts" :visible-arrow="false">
        <font-awesome icon="ellipsis-v" class="fa titleOptions" slot="reference"/>
        <div class="popper">
          Content
        </div>
      </popper>

      <span id="title" v-html="whatTitleIsPlaying"></span>
    </div>
    <div class="playbackPosition">
      <vue-slider
        v-model="playbackPercent"
        :tooltip-placement="'bottom'"
        :tooltip-formatter="`${toolTipValue}`"
        :contained="true"
        @dragging="updatePlaybackPercent"
        @drag-end="playStatusUpdateDraggingEnd">
      </vue-slider>
    </div> <!-- end playbackPosition -->
    <div class="playbackTime"> {{ playbackCountdown }} </div>
  </div>
</template>

<script>
  import VueSlider from 'vue-slider-component';
  import 'vue-slider-component/theme/default.css';
  import Popper from 'vue-popperjs';
  import 'vue-popperjs/dist/vue-popper.css';
  import EventBus from '../eventBus.js';

  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faPlay, faPause, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  library.add(faPlay, faPause, faEllipsisV);

  export default {
    name: 'remote-player',
    components: {
      VueSlider,
      'font-awesome': FontAwesomeIcon,
      'popper': Popper

    },
    data: function () {
      return {
        playbackPercent: 0,
        durations: {},
        indexes: {
          playing: 0,
          pdf: 0
        },
        playStatus: false,
        wasPlayingBeforeScrub: false,
        whatIsPlayingOnOpen: -1,
        whatTitleIsPlaying: '',
        popperOpts: {
          placement: 'top-start',
          modifiers: {
            preventOverflow: {
              enabled: false
            }
          }
        }
      }
    },

    methods: {
      togglePlayStatus() {
        if (this.playStatus) { //if the player is playing pause it, and don't worry about scrubbing.
          EventBus.$emit(`PAUSE_PLAYER_${this.indexes.playing}`);
          this.wasPlayingBeforeScrub = false;

        } else if (this.playStatus == false && this.indexes.playing == -1) { // if the player is not playing and nothing was playing on open
          EventBus.$emit(`START_PLAYER_${this.indexes.pdf}`);
          this.indexes.playing = this.indexes.pdf;

        } else { //if we're starting and that had been stopped.
          EventBus.$emit(`START_PLAYER_${this.indexes.playing}`);

        }
        //toggle the playStatus no matter what.
        this.playStatus = !this.playStatus;
      },

      updatePlaybackPercent(value) {
        if(this.playStatus) { //if things are playing we need to pause them and set a reminder to start again when done (wasPlayingBeforeScrub)
          this.wasPlayingBeforeScrub = true;
          this.playStatus = false;
          EventBus.$emit(`PAUSE_PLAYER_${this.indexes.playing}`);
        }
        EventBus.$emit(`PLAYER_PROGRESS_UPDATE_${this.indexes.playing}`, this.playbackPercent);
      },

      //if we were playing before drag we need to play again.
      playStatusUpdateDraggingEnd() {
        if(this.wasPlayingBeforeScrub) {
          this.playStatus = true;
          EventBus.$emit(`START_PLAYER_${this.indexes.playing}`);
        }
      },

      //called when the pdf is opened. Gets the durations needed for both PDF and already playing.
      getDurations() {
        return {
          pdf: this.$store.getters.getRequestedDuration(this.indexes.pdf),
          playing: this.$store.getters.getRequestedDuration(this.indexes.playing)
        };
      },

      //just a local storage for indexes
      registerIndexes(pdfIndex) {
        this.indexes = {
          pdf: pdfIndex,
          playing: this.whatIsPlayingOnOpen
        }
      },

      //goes to the store and gets the index of what is playing now
      getWhatIsPlayingNow() {
        return this.$store.state.whatIsPlaying;
      },

      //goes to the store and gets the title of whats playing
      getAppropriateTitle(index) {
        if(this.playStatus) { //if playing get the playing title
          return this.$store.state.titles[this.whatIsPlayingOnOpen];
        } else { //or get the pdf title
          return this.$store.getters.getRequestedTitle(index)
        }
      },
    },

    mounted() {
      EventBus.$on('OPEN_PDF_MODAL', (index) => {
        //get what index is playing when we opened up
        this.whatIsPlayingOnOpen = this.getWhatIsPlayingNow();
        //if something is playing set the playStatus to true
        this.playStatus = (this.whatIsPlayingOnOpen == -1 ) ? false : true;
        //get the title--either what is playing or pdf title
        this.whatTitleIsPlaying = this.getAppropriateTitle(index);
        //get some data for what is playing and the pdf
        this.registerIndexes(index);
        this.durations = this.getDurations();
        //update the play status bar if something is playing, else set it to 0
        this.playbackPercent = (this.playStatus) ? this.playbackPercent : 0;
        // this.showPlayThisPdf = (this.indexes.pdf != show.indexes.playing || this.indexes.playing != -1) ? false : true;
      });

      EventBus.$on("NEW_PROGRESS_PERCENT", (newPercent) => {
        this.playbackPercent = newPercent;
      });
    },

    computed: {
      playbackCountdown() {
        //we need konw if something was playing on open and what it was
        let whichDuration = (this.whatIsPlayingOnOpen > -1) ? 'playing' : 'pdf';
        let progressMul = this.playbackPercent / 100;
        let newDurationSec = this.durations[whichDuration] - (this.durations[whichDuration] * progressMul);
        return convertTimeToString(newDurationSec);
      },
      toolTipValue() {
        //TODO: combine these so it's less redundant.
        let whichDuration = (this.whatIsPlayingOnOpen > -1) ? 'playing' : 'pdf';
        let progressMul = this.playbackPercent / 100;
        let newDurationSec = this.durations[whichDuration] * progressMul;
        return convertTimeToString(newDurationSec);
      },
      playThisScore() {
        if(this.indexes.pdf == this.indexes.playing || this.indexes.playing == -1) {
          return false;
        } else {
          return true;
        }
      }
    },
  }

  //https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
  function convertTimeToString(time) {
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;
    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";
    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}
</script>

<style>

.playbackWrapper {
  height: 42px;
  width: 50%;
  display: grid;
  grid-template-columns: [play] 1fr [progressBar] 75% [progressText] 1fr;
  grid-template-rows: [top] 21px [bottom] 21px;
  align-items: center;
  position: absolute;
  z-index: 9002;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
}
.playbackPosition {
  grid-row: bottom;
  grid-column: progressBar;
  padding-bottom: 4px;
}
.playbackTitle {
  grid-row: top;
  grid-column: progressBar;
  justify-content: center;
  font-family: "Nunito Sans", sans-serif;
  color: #fff;
  font-size: 13px;
  padding-top: 8px;
  display: inline-block;
}

.playbackTime {
  grid-row: 1 / 3;
  grid-column: progressText;
  font-family: "Nunito Sans", sans-serif;
  color: #fff;
}
.playbackControls {
  height: 100%;
  width: 100%;
  grid-row: 1 / 3;
  grid-column: play;
  justify-self: center;
  display: grid;
  grid-row-template: 1;
  grid-template-columns: 1fr 1fr 1fr;
}
.controlWrapper.circle-fa{
  grid-row: 1;
  grid-column: 1;
}
.controlWrapper.play-pause{
  grid-row: 1;
  grid-column: 2 / 4;
}
.playbackControls .fa {
  transform: scale(1.1, 1.1);
}
.titleOptions.fa {
  top: 0;
  padding-right: 5px;
}
.vue-slider-rail {
  background-color: #747777;
  border-radius: 15px;
}
.vue-slider-process {
  background-color: #fff;
  border-radius: 15px;
}
.vue-slider-dot-handle-focus {
  box-shadow: 0px 0px 1px 2px rgba(116, 119, 119, 0.36);
}
.vue-slider-dot-tooltip-inner {
  font-size: 14px;
  white-space: nowrap;
  padding: 2px 5px;
  min-width: 20px;
  text-align: center;
  color: #fff;
  border-radius: 5px;
  border-color: #747777;
  background-color: #747777;
  box-sizing: content-box;
  position: relative;
  z-index: 9001;
  font-family: "Nunito Sans", sans-serif;
}

</style>
