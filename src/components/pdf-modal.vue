<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <pdf :src="source" style="height:75vh; width:auto;"></pdf>

         <footer class="modal-footer">
            <slot name="footer">
              I'm the default footer!
              <button
                type="button"
                class="btn-green"
                @click="close"
              >
                Close me!
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import pdf from 'vue-pdf';
import EventBus from '../eventBus.js';

// const co3 = pdf.createLoadingTask('/CO3_fs.pdf');
// const extinguish = pdf.createLoadingTask('/Extinguish_fs.pdf');

export default {
  name: 'pdf-modal',
  data: function() {
    return {
      publicPath: process.env.BASE_URL,
      source: undefined,
      numPages: undefined
    }
  },
  components: {
    pdf
  },
  methods: {
    close() {
      this.$emit('close');
    }
  },
  mounted() {
    let self = this;
    //TODO: this chaining of event busses seems ROUGH
    EventBus.$on('loadPdf', function() {
      self.source = pdf.createLoadingTask('/CO3_fs.pdf')
      EventBus.$emit('openPdfModal');
    });
  },
};
</script>

<style>

/* .pdfWrapper canvas {
  height:calc(100vh - 15%);
  width: auto;
} */




  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9998;
  }
  .modal {
    background: #FFFFFF;
    box-shadow: 0px 0px 20px 1px #282828;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }
  .modal-footer {
    padding: 15px;
    display: flex;
  }
  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
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
