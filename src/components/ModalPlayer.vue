<template>
  <div class="playbackWrapper">
    <div class="playbackPosition">
      <vue-slider v-model="value" :tooltip-placement="'bottom'"></vue-slider>
    </div>
    <div class="playbackTime"> 0:00 </div>

    </div>
  </div>
</template>

<script>
  import VueSlider from 'vue-slider-component';
  import 'vue-slider-component/theme/default.css';

  export default {
    name: 'modal-player',
    components: {
      VueSlider
    },
    data: function () {
      return {
        value: 10
      }
    }
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
