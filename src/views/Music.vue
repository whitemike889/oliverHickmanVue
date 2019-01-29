<template>
  <div>
    <div class="imgContainer1">
      <img class="img" src="@/assets/Oliver+Kiersten-169.jpg" alt="noImg">
    </div>
    <div class="content">
      <h1> MUSIC </h1>
      <div v-for='piece in $options.musicData'>
        <audio-player :title="piece.title" :details="piece.details"></audio-player>
      </div>
    </div>
  </div>
</template>

<script>
import AudioPlayer from '@/components/audioPlayer.vue';
import musicData from '@/assets/musicData.json';

export default {
  components: {
    AudioPlayer
  },
  musicData: musicData
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
