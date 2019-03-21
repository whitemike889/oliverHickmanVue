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
          class="fa-times"
          @click="close"
        />
        <font-awesome
          icon="times"
          class="fa-zoom"
          @click="zoomIn"
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
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faTimes);

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
      loadingEndPointScale: 0
    }
  },

  components: {
    PDFPage,
    'font-awesome': FontAwesomeIcon,
    ProgressBar
  },

  methods: {
    close() {
      this.clearProgress();
      EventBus.$emit('closePdfModal');
      this.scale = 1;
    },

    async fetchPDF() {
      let PDFJS = await import('pdfjs-dist/webpack'); /* webpackChunkName: 'pdfjs-dist' */
        console.log("LOADING DOCUMENT");
      let pdf = await PDFJS.getDocument(this.url);
        console.log("RENDERING PDF");
      this.pdf = pdf;
    },

    zoomIn() {
      this.clearProgress();
      this.scale += 0.1;
    },

    clearProgress() {
      this.progressArray = [];
      this.loadingProgress = 0;
    }
  },

  mounted() {
    let that = this; //I hate doing this so much is there a better way?
    EventBus.$on('LOAD_PDF', function(file) {
      that.url = file;
        console.log(`FETCHING URL: ${that.url}`);
      that.fetchPDF();
    });

    EventBus.$on('PAGE_RENDERED', function(page) {
      that.progressArray.push(page);
      that.loadingProgress = that.progressArray.length * that.loadingEndPointScale;
      console.log(that.loadingProgress);
      // console.log('rendering page', that.progressArray);
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
    }
  },
};
</script>

<style>
  .pdf-wrapper{
    position: absolute;
    top: 42px;
  }
  .fa-times{
    position: absolute;
    top: 13px;
    left: 15px;
    color: #fff;
    cursor: pointer;
    transform:scale(2, 2);
    z-index: 9001;
  }
  .fa-zoom{
    position: absolute;
    top: 13px;
    left: 50px;
    color: #fff;
    cursor: pointer;
    transform:scale(2, 2);
    z-index: 9001;
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
