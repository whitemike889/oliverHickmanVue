<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <div class="nav-cover"></div>
        <font-awesome
          icon="times"
          class="fa-times"
          @click="close"
        />
        <div class="pdf-wrapper">
          <div class="pdf-document">
            <PDFPage
              v-for="page in pages"
              v-bind="{scale}"
              :key="page.pageNumber"
              :page="page"
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

import EventBus from '../../eventBus.js';
// stuff for font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faTimes);

export default {
  name: 'pdf-modal',
  props: ['index', 'file'],
  data: function() {
    return {
      pages: [],
      pdf: undefined,
      scale: 1,
    }
  },
  components: {
    PDFPage,
    'font-awesome': FontAwesomeIcon
  },
  methods: {
    close() {
      EventBus.$emit('closePdfModal', this.index);
    },
    async fetchPDF() {
      let url = `/${this.file}`;
        console.log("GOT URL");
      let PDFJS = await import('pdfjs-dist/webpack'); /* webpackChunkName: 'pdfjs-dist' */
        console.log("LOADED PDFJS");
      let pdf = await PDFJS.getDocument(url);
        console.log("GOT PDF");
      this.pdf = pdf;
    }
  },
  mounted() {
    let that = this; //I hate doing this so much is there a better way?
    EventBus.$on('openPdfModal', function(index) {
      if (that.index == index) {
        //get pdf
        that.fetchPDF()
      }
    });
  },
  watch: {
    pdf: {
      handler(pdf) {
        this.pages = [];
        const promises = range(1, pdf.numPages).map(number => pdf.getPage(number));
        return Promise.all(promises).
          then(pages => (this.pages = pages)).
          then(() => console.log('pages fetched'))
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
  .fa-times{
    position: absolute;
    top: 13px;
    left: 15px;
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
