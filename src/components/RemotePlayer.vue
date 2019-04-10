<template>
  <div class="playbackWrapper">
    <div class="playbackControls">
      <font-awesome v-show="!playStatus" icon="play" class="fa" @click="togglePlayStatus"/>
      <font-awesome v-show="playStatus" icon="pause" class="fa" @click="togglePlayStatus"/>
    </div>
    <div class="playbackTitle" v-html="whatTitleIsPlaying"> {{ whatTitleIsPlaying }} </div>
    <div class="playbackPosition">
      <vue-slider
        v-model="playbackPercent"
        :tooltip-placement="'bottom'"
        :tooltip-formatter="`${toolTipValue}`"
        :contained="true"
        @dragging="updatePlaybackPercent"
        @drag-end="playStatusUpdateDraggingEnd">
      </vue-slider>
    </div>
    <div class="playbackTime"> {{ playbackCountdown }} </div>
  </div>
</template>

<script>
  import VueSlider from 'vue-slider-component';
  import 'vue-slider-component/theme/default.css';
  import EventBus from '../eventBus.js';

  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  library.add(faPlay, faPause);

  export default {
    name: 'remote-player',
    components: {
      VueSlider,
      'font-awesome': FontAwesomeIcon,
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
        wasPlaying: false,
        whatIsPlayingOnOpen: -1,
        whatTitleIsPlaying: ''
      }
    },

    methods: {
      togglePlayStatus() {
        if (this.playStatus) {
          EventBus.$emit(`PAUSE_PLAYER_${this.indexes.playing}`);
          this.wasPlaying = false;
        } else {
          EventBus.$emit(`START_PLAYER_${this.indexes.playing}`);
          // this.indexes.playing = this.indexes.pdf;
        }
        this.playStatus = !this.playStatus;
      },

      updatePlaybackPercent(value) {
        //if things are playing we need to pause them and set a reminder to start again when done (wasPlaying)
        if(this.playStatus) {
          this.wasPlaying = true;
          this.playStatus = false;
          EventBus.$emit(`PAUSE_PLAYER_${this.indexes.playing}`);
        }
        EventBus.$emit(`PLAYER_PROGRESS_UPDATE_${this.indexes.playing}`, this.playbackPercent);
      },

      playStatusUpdateDraggingEnd() {
        //if we were playing before drag we need to play again.
        if(this.wasPlaying) {
          this.playStatus = true;
          EventBus.$emit(`START_PLAYER_${this.indexes.playing}`);
        }
      },

      getDurations() {
        //called when the pdf is opened. Gets the durations needed for both PDF and already playing.
        return {
          pdf: this.$store.getters.getRequestedDuration(this.indexes.pdf),
          playing: this.$store.getters.getRequestedDuration(this.indexes.playing)
        };
      },

      registerIndexes(pdfIndex) {
        this.indexes = {
          pdf: pdfIndex,
          playing: this.whatIsPlayingOnOpen
        }
      },

      getWhatIsPlayingNow() {
        return this.$store.state.whatIsPlaying.index;
      },
      getWhatTitleIsPlayingNow() {
        return this.$store.state.whatIsPlaying.title;
      }
    },

    mounted() {
      let that = this;
      EventBus.$on("NEW_PROGRESS_PERCENT", (newPercent) => {
        that.playbackPercent = newPercent;
      });
      EventBus.$on('OPEN_PDF_MODAL', (index) => {
        this.whatIsPlayingOnOpen = this.getWhatIsPlayingNow();
        this.whatTitleIsPlaying = this.getWhatTitleIsPlayingNow();
        this.registerIndexes(index);
        this.durations = this.getDurations();
      });
      EventBus.$on("PLAYER_STATUS_CHANGE", (payload) => {
        that.playIndex = payload.index;
        that.playStatus = payload.playerIsPlaying;
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
      }
    }
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
}
.playbackTime {
  grid-row: 1 / 3;
  grid-column: progressText;
  font-family: "Nunito Sans", sans-serif;
  color: #fff;
}
.playbackControls {
  grid-row: 1 / 3;
  grid-column: play;
  justify-self: center;
}
.playbackControls .fa {
  transform: scale(1.1, 1.1);
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
