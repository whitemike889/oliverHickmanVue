<template>
  <div id="music">
    <div class="imgContainer1">
      <img class="img" src="@/assets/img/Oliver+Kiersten-169.jpg" alt="noImg">
    </div>
    <div class="content">
      <h1> MUSIC </h1>
      <pdf-modal v-show="modalIsShowing" />
      <div class="pieceWrapper"
        v-for='(piece,index) in $options.musicData'
      >
        <cover-viewer class="cover" :index="index"/>
        <audio-player class="audioPlayer"
          :index="index"
          :title="piece.title"
          :details="piece.details"
          :waveform="piece.waveform"
          :audio="piece.audio"
          :mvmts="validateMovements(piece.movements)"
        />
      </div> <!-- end pieceWrapper -->
    </div> <!-- end content -->
  </div>
</template>

<script>
//components
import AudioPlayer from '@/components/audioPlayer.vue';
import coverViewer from '@/components/coverViewer.vue';
import pdfModal from '@/components/pdf/pdf-modal.vue';

//data
import musicData from '@/musicData.json';
import EventBus from '../eventBus.js';

export default {
  components: {
    AudioPlayer,
    coverViewer,
    pdfModal
  },

  musicData: musicData,

  data: function() {
    return {
      pdfFile: [], //this is populated beforeMount
      modalIsShowing: false,
    }
  },

  methods: {
    validateMovements: function (piece) {
      //return the movements if exist or false
      return (typeof piece !== 'undefined' ? piece : false);
    },

    togglePdfModal: function() {
        this.modalIsShowing = !this.modalIsShowing;
    },
  },

  mounted() {
    //open the modal first, then emit the load pdf event with requested file
    EventBus.$on('OPEN_PDF_MODAL', (clickIndex) => {
      this.togglePdfModal();
      EventBus.$emit('LOAD_PDF', this.pdfFile[clickIndex])
      });
    //close the modal
    EventBus.$on('CLOSE_PDF_MODAL', () => {
      this.togglePdfModal();
    });
  },

  beforeMount() {
    //make an array of data that the PDF modal will use
    let that = this;
    musicData.forEach( (music, index) => {
      that.pdfFile[index] = music.pdf;
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
