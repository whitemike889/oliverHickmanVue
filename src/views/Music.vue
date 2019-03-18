<template>
  <div>
    <div class="imgContainer1">
      <img class="img" src="@/assets/img/Oliver+Kiersten-169.jpg" alt="noImg">
    </div>
    <div class="content">
      <h1> MUSIC </h1>
      <div
        class="pieceWrapper"
        v-for='(piece,index) in $options.musicData'
      >
        <cover-viewer
          class="cover"
          :index="index"
        />
        <pdf-modal
          v-show="pdfData[index].thisModalIsShowing"
          :index="index"
          :file="pdfData[index].file"
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
    }
  },
  methods: {
    validateMovements: function (piece) {
      //return the movements if exist or false
      return (typeof piece !== 'undefined' ? piece : false);
    },
    togglePdfModal: function(index) {
      this.pdfData[index].thisModalIsShowing = !this.pdfData[index].thisModalIsShowing;
      this.$forceUpdate(); //Either I don't understand Vue or it's a bug. Not sure why I need to do this...
    }
  },
  mounted() {
    EventBus.$on('openPdfModal', (index) => {
      this.togglePdfModal(index);
    });
    EventBus.$on('closePdfModal', (index) => {
      this.togglePdfModal(index);
    });
  },
  beforeMount() {
    //make an array of data that the PDF modal will use
    let that = this;
    musicData.forEach(function(music, index) {
      that.pdfData[index] = {
        file: music.pdf,
        thisModalIsShowing: false
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
