<template>
  <div class="playbackWrapper">
    <div class="playbackPosition">
      <vue-slider v-model="playbackPercent" :tooltip-placement="'bottom'"></vue-slider>
    </div>
    <div class="playbackTime"> {{ playbackTime }} </div>

    </div>
  </div>
</template>

<script>
  import VueSlider from 'vue-slider-component';
  import 'vue-slider-component/theme/default.css';
  import EventBus from '../eventBus.js';

  export default {
    name: 'remote-player',
    components: {
      VueSlider
    },
    data: function () {
      return {
        value: 0,
        playbackPercent: 0,
        playbackTime: this.duration
      }
    },
    props: ['duration'],
    methods: {
      convertToDuration: function(time) {
        return convertTimeToString(time);
      },
      calculateDurationRemaining(progress) {
        let progressMul = progress / 100;
        let newDurationSec = this.duration - (this.duration * progressMul);
        let newDuration = convertTimeToString(newDurationSec);
        this.playbackTime = newDuration;
      }
    },
    mounted() {
      let that = this;
      EventBus.$on("NEW_PROGRESS_PERCENT", (value) => {
        that.playbackPercent = value;
        this.calculateDurationRemaining(value);
      });
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
  grid-template-columns: [play] auto [progressBar] 75% [progressText] auto;
  align-items: center;
  position: absolute;
  z-index: 9002;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
}
.playbackPosition {
  grid-column: progressBar;
  justify-content: center;
}
.playbackTime {
  grid-column: progressText;
  font-family: "Nunito Sans", sans-serif;
  color: #fff;
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
