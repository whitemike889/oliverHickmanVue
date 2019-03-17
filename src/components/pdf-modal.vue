<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">

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
import EventBus from '../eventBus.js';

export default {
  name: 'pdf-modal',
  props: ['index', 'file'],
  data: function() {
    return {
      publicPath: process.env.BASE_URL,
      source: undefined,
      numPages: undefined
    }
  },
  components: {
  },
  methods: {
    close() {
      EventBus.$emit('closePdfModal', this.index);
    },
    fetchPDF() {
      console.log("HERE");
      import(
        /* webpackChunkName: 'pdfjs-dist' */
        'pdfjs-dist/webpack'
      ).
        // then(pdfjs => pdfjs.getDocument(this.url)).
        // then(pdf => (this.pdf = pdf)).
        // then(() => log('pdf fetched'))
        then(console.log("LOADED"));
    },
  },
};
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
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
