<template>
  <div>
    <div class="imgContainer1">
      <img class="img" src="@/assets/img/Oliver+Kiersten-169.jpg" alt="noImg">
    </div>
    <div class="content">
      <h1> MUSIC </h1>
      <pdf-modal
        v-show="modalIsShowing"
      />
      <div
        class="pieceWrapper"
        v-for='(piece,index) in $options.musicData'
      >
        <cover-viewer
          class="cover"
          :index="index"
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
import pdfModal from '@/components/pdf/pdf-modal.vue';
import musicData from '@/musicData.json';
import EventBus from '../eventBus.js';

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
      pdfData: [], //this is populated beforeMount
      modalIsShowing: false,
      pdfForModal: undefined
    }
  },
  methods: {
    validateMovements: function (piece) {
      //return the movements if exist or false
      return (typeof piece !== 'undefined' ? piece : false);
    },
    togglePdfModal: function() {
        this.modalIsShowing = !this.modalIsShowing;
    }
  },

  mounted() {
    EventBus.$on('openPdfModal', (clickIndex) => {
      this.togglePdfModal();
      this.pdfForModal = this.pdfData[clickIndex]['file'];
      EventBus.$emit('LOAD_PDF', this.pdfData[clickIndex]['file'])
      });
    EventBus.$on('closePdfModal', () => {
      this.togglePdfModal();
    });
  },
  beforeMount() {
    //make an array of data that the PDF modal will use
    let that = this;
    musicData.forEach(function(music, index) {
      that.pdfData[index] = {
        file: music.pdf,
      };
    });
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
  padding-bottom: 30px;
}

.cover {
  grid-column: cover;
}
</style>
