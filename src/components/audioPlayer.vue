<template>
  <div class='playerWrapper'>
    <h2> {{ title.toUpperCase() }} </h2>
    <img src="@/assets/flickering_waveform.png" class="waveform">
    <div class='songProgress'>
      <div class='songProgressBar' v-bind:style="{ width:playbackPercent }"></div>
    </div>
    <div class='player'>
      <vue-plyr ref="plyr">
        <audio>
          <source src="@/assets/FluorescentFilckering.mp3" type="audio/mp3"/>
        </audio>
      </vue-plyr>
    </div> <!-- end player -->
    <p class="detail" v-html="details"> </p>
  </div> <!-- end playerWrapper -->
</template>

<script>
import { VuePlyr } from 'vue-plyr';
import 'vue-plyr/dist/vue-plyr.css';

export default {
  name: 'audio-player',
  components: {
    VuePlyr
  },
  data: function (){
    return {
      playbackPercent: '0%'
    }
  },
  props: ['title', 'details'],
  methods: {
    //this updates the bar as it progresses
    updatePlaybackBar: function () {
      let percent = (this.player.currentTime / this.duration) * 100;
      let percentString = `${ percent.toString() }%`
      this.playbackPercent = percentString;
    }
  },
  mounted () {
    //this binds the event listener on mount
    this.player.on('timeupdate', this.updatePlaybackBar)
  },
  computed: {
    //define the player object. Can now be accessed through this.player
    player () { return this.$refs.plyr.player },
    duration () { return this.$refs.plyr.player.duration }
  }
}
</script>

<style>

p.detail {
  position: absolute;
  text-align: left;
  line-height: 20px;
  bottom: 0px;
  margin: 0 0 5px 20px;
}
.linkOut {
  color: #4f4f4f;
}

/* Overlap the three divs */
.playerWrapper {
  position: relative;
  width: 100vw;
  height: 200px;
}
.waveform, .player, .songProgress {
  position: absolute;
  top: 0;
  left: 0;
}

.waveform {
  width: 100vw;
  height: 100%;
}

/* Make the progress bar */
.songProgress {
  width: 100%;
  height: 100%;
}
.songProgressBar {
  width: 20%; /* This will be overwritten immediately */
  height: 100%;
  background-color: #034121;
  opacity: 0.18;
}

/* Style the plyr a bit */
.plyr {
  font-family: "Nunito Sans", sans-serif;
  color: #000;
  width: 100vw;
  padding-right: 10px;
  padding-top: 74px;
}
/* Hide the speed settings. Ain't nobody got time for that */
.plyr__menu {
  display: none;
}
/* Change the background color of the volume and progress */
.plyr--full-ui input[type="range"] {
  color: #02552b;
}
.plyr--audio .plyr__control, .plyr--audio .plyr__controls {
  color: #000;
}
.plyr--audio .plyr__control:hover {
  background: #02552b;
  color: #fff;
}
/* Change the slider background color on all browsers */
.plyr--full-ui.plyr--audio input[type="range"]::-webkit-slider-runnable-track {
  background: #747777;
  box-shadow: 0 0 0 0px;
}
.plyr--full-ui.plyr--audio input[type="range"]::-moz-range-track {
  background: #747777;
  box-shadow: 0 0 0 0px;
}
.plyr--audio .plyr__controls{
  background-color: transparent;
}
</style>
