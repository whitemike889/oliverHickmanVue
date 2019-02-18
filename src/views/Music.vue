<template>
  <div>
    <div class="imgContainer1">
      <img class="img" src="@/assets/img/Oliver+Kiersten-169.jpg" alt="noImg">
    </div>
    <div class="content">
      <h1> MUSIC </h1>
      <div class="pieceWrapper" v-for='(piece,index) in $options.musicData'>
        <pdf-viewer class="pdfCover" />
        <audio-player class="audioPlayer"
          :index="index"
          :title="piece.title"
          :details="piece.details"
          :waveform="piece.waveform"
          :audio="piece.audio"
          :mvmts="validateMovements(piece.movements)"
        ></audio-player>
      </div>
    </div>
  </div>
</template>

<script>
import AudioPlayer from '@/components/audioPlayer.vue';
import pdfViewer from '@/components/pdfViewer.vue';
import musicData from '@/musicData.json';

export default {
  components: {
    AudioPlayer,
    pdfViewer
  },
  musicData: musicData,
  methods: {
    validateMovements: function (piece) {
      //return the movements if exist or false
      return (typeof piece !== 'undefined' ? piece : false);
    }
  }
}
</script>

<style>

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

.pieceWrapper {
  display: inline-grid;
  width:100vw;
  grid-template-rows: 200px;
  grid-template-columns: [cover] 155px [player] auto;
  grid-column-gap: 5px;
}

.pdfCover {
  grid-column: cover;
}
</style>
