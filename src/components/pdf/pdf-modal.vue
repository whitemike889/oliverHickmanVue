<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <div class="nav-cover"></div>
        <progress-bar
          class="loadingBar"
          :val="loadingProgress"
          bg-color="#b3b4b4"
          bar-color="#012a15"
          bar-transition="all 0.1s ease"
        ></progress-bar>
        <font-awesome
          icon="times"
          class="fa fa-times"
          @click="close"
        />
        <font-awesome
          icon="search-plus"
          class="fa fa-zoom"
          @click="zoomIn(0.1)"
        />
        <font-awesome
          icon="search-minus"
          class="fa fa-zoom-out"
          @click="zoomOut(0.1)"
        />
        <div class="pdf-wrapper">
          <div class="pdf-document" :key="scale">
            <PDFPage
              v-for="page in pages"
              :key="page.pageNumber"
              :page="page"
              :scale="scale"
            />
          </div>
        </div> <!-- end pdf-wrapper -->
      </div> <!-- end modal -->
    </div>
  </transition>
</template>

<script>
//stuff for pdf modal
import PDFPage from './PDFPage';
import range from 'lodash/range';
import ProgressBar from 'vue-simple-progress'

import EventBus from '../../eventBus.js';
// stuff for font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faSearchPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faTimes, faSearchPlus, faSearchMinus);

export default {
  name: 'pdf-modal',

  data: function() {
    return {
      pages: [],
      pdf: undefined,
      scale: 1,
      url: '',
      progressArray: [],
      loadingProgress: 0,
      loadingEndPointScale: 0,
    }
  },

  components: {
    PDFPage,
    'font-awesome': FontAwesomeIcon,
    ProgressBar
  },

  methods: {
    async fetchPDF() {
      let PDFJS = await import('pdfjs-dist/webpack'); /* webpackChunkName: 'pdfjs-dist' */
        console.log("LOADING DOCUMENT");
      let pdf = await PDFJS.getDocument(this.url);
        console.log("RENDERING PDF");
      this.pdf = pdf;
    },

    zoomIn(inc) {
      this.clearProgress();
      this.scale += inc;
      this.userScale = Math.floor(this.scale * 100);
    },

    zoomOut(dec) {
      this.clearProgress();
      this.scale -= dec;
      this.userScale = Math.floor(this.scale * 100);
    },

    clearProgress() {
      this.progressArray = [];
      this.loadingProgress = 0;
    },

    close() {
      this.clearProgress();
      this.scale = 1;
      EventBus.$emit('closePdfModal');
    },
  },

  mounted() {
    this.scale = 1

    let that = this; //I hate doing this so much is there a better way?
    EventBus.$on('LOAD_PDF', function(file) {
      that.url = file;
        console.log(`FETCHING URL: ${that.url}`);
      that.fetchPDF();
    });

    EventBus.$on('PAGE_RENDERED', function(page) {
      that.progressArray.push(page);
      that.loadingProgress = that.progressArray.length * that.loadingEndPointScale;
    });
  },

  watch: {
    pdf: {
      handler(pdf) {
        this.pages = [];
        const promises = range(1, pdf.numPages+1).map(number => pdf.getPage(number));
        return Promise.all(promises).
          then( (pages) => {
            this.pages = pages
            let loadingEndPoint = pages.length
            this.loadingEndPointScale = 100 / loadingEndPoint;
          });
          // then(() => console.log(this.pages))
      }
    },
  },
};
</script>

<style>
  .pdf-wrapper{
    position: absolute;
    top: 42px;
  }
  .fa {
    position: absolute;
    top: 13px;
    color: #fff;
    cursor: pointer;
    z-index: 9001;
  }
  .fa-times{
    left: 15px;
    transform:scale(2, 2);
  }
  .fa-zoom{
    left: 50px;
    transform:scale(1.6, 1.6);
  }
  .fa-zoom-out{
    left: 85px;
    transform:scale(1.6, 1.6);
  }
  .pdf-document {
    position: fixed;
    overflow: scroll;
    width: 100%;
    height: 100%;
  }
  .nav-cover{
    background-color: #012a15;
    top: 0;
    width: 100vw;
    height: 42px;
    z-index: 8999;
  }
  .loadingBar {
    position: relative;
    z-index: 8999;
    margin-top: -3px;
  }
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9000;
  }
  .modal {
    background: #FFFFFF;
    box-shadow: 0px 0px 20px 1px #282828;
    overflow-x: auto;
  }
  .modal-footer {
    padding: 15px;
  }
  .modal-footer {
    border-top: 1px solid #eeeeee;
  }
  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

/* Transitions */
  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }
  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .3s ease
  }
</style>
