<template>
  <div>
    <div class="imgContainer1">
      <img class="img" src="@/assets/img/Oliver+Kiersten-169.jpg" alt="noImg">
    </div>
    <div class="content">
      <h1> MUSIC </h1>
      <div class="pieceWrapper" v-for='(piece,index) in $options.musicData'>
        <cover-viewer
          class="cover"
          v-on:open="loadPdfInModal"
        />
        <pdf-modal
          v-show="isPdfModalVisible"
          v-on:close="closePdfModal"
        />
        <audio-player class="audioPlayer"
          :index="index"
          :title="piece.title"
          :details="piece.details"
          :waveform="piece.waveform"
          :audio="piece.audio"
          :mvmts="validateMovements(piece.movements)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AudioPlayer from '@/components/audioPlayer.vue';
import coverViewer from '@/components/coverViewer.vue';
import pdfModal from '@/components/pdf-modal.vue';
import EventBus from '../eventBus.js';
import musicData from '@/musicData.json';

// const publicPath = process.env.BASE_URL;

export default {
  components: {
    AudioPlayer,
    coverViewer,
    pdfModal
  },
  musicData: musicData,
  data: function() {
    return {
      isPdfModalVisible: false,
    }
  },
  methods: {
    validateMovements: function (piece) {
      //return the movements if exist or false
      return (typeof piece !== 'undefined' ? piece : false);
    },
    loadPdfInModal: function() {
      // this.isPdfModalVisible = true
      EventBus.$emit('loadPdf');
    },
    closePdfModal: function() {
      this.isPdfModalVisible = false
    }
  },
  mounted() {
    let self = this;
    EventBus.$on('openPdfModal', function() {
      self.isPdfModalVisible = true;
    })
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

.cover {
  grid-column: cover;
}
</style>
