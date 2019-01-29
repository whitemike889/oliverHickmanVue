<template>
  <div>
    <div class="imgContainer1">
      <img class="img" src="@/assets/Oliver+Kiersten-169.jpg" alt="noImg">
    </div>
    <div class="content">
      <h1> MUSIC </h1>
      <audio-player />
    </div>
  </div>
</template>

<script>
import AudioPlayer from '@/components/audioPlayer.vue';

export default {
  components: {
    AudioPlayer
  }
}
</script>

<style>
h2 {
  color: #b3b4b4;
  font-size: 24px;
  font-family: "Nunito Sans", sans-serif;
  font-weight: 400;
  letter-spacing: 0.3em;
}

p.detail {
  text-align: left;
  margin-top: 0px;
  line-height: 20px;
}

.linkOut {
  color: #4f4f4f;
}

.content {
  grid-row: stuff;
  text-align: center;
  padding-bottom: 50px;
  padding-top: 10px;
  background-color: #fff;
  margin-top: -8px;
}

.musicContent {
  display: inline-grid;
  width: 95%;
}
</style>
