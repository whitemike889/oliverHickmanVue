<script>
// import debug from 'debug';
// const log = debug('app:vue_features/documents/components/PDFPage');

export default {
  props: ['page', 'scale'],

  computed: {
    actualSizeViewport() {
      console.log(this.viewport.clone({scale: this.scale}));
      return this.viewport.clone({scale: this.scale});
    },

    canvasStyle() {
      const {width: actualSizeWidth, height: actualSizeHeight} = this.actualSizeViewport;
      const pixelRatio = window.devicePixelRatio || 1;
      const scaleRatio = (window.innerHeight - 48 /*48 is the height of the navBar*/ ) / actualSizeHeight;
      console.log(scaleRatio);
      const [pixelWidth, pixelHeight] = [actualSizeWidth, actualSizeHeight].map(dim => Math.ceil((dim / pixelRatio) * scaleRatio));
      return `width: ${pixelWidth}px; height: ${pixelHeight}px;`
    },

    canvasAttrs() {
      let {width, height} = this.viewport;
      [width, height] = [width, height].map(dim => Math.ceil(dim));

      const style = this.canvasStyle;

      return {
        width,
        height,
        style,
        class: 'pdf-page',
      };
    },

    pageNumber() {
      return this.page.pageNumber;
    },
  },

  methods: {
    renderPage() {
      // PDFPageProxy#render
      // https://mozilla.github.io/pdf.js/api/draft/PDFPageProxy.html
      this.renderTask = this.page.render(this.getRenderContext());
      this.renderTask.then(() => this.$emit('rendered', this.page));
        // then(() => console.log(`Page ${this.pageNumber} rendered`));
    },

    destroyPage(page) {
      if (!page) return;

      // PDFPageProxy#_destroy
      // https://mozilla.github.io/pdf.js/api/draft/PDFPageProxy.html
      page._destroy();

      // RenderTask#cancel
      // https://mozilla.github.io/pdf.js/api/draft/RenderTask.html
      if (this.renderTask) this.renderTask.cancel();
    },

    getRenderContext() {
      const {viewport} = this;
      const canvasContext = this.$el.getContext('2d');

      return {canvasContext, viewport};
    },
  },

  watch: {
    page(page, oldPage) {
      this.destroyPage(oldPage);
    },
  },

  created() {
    // PDFPageProxy#getViewport
    // https://mozilla.github.io/pdf.js/api/draft/PDFPageProxy.html
    this.viewport = this.page.getViewport(this.scale);
  },

  mounted() {
    // console.log(`Page ${this.pageNumber} mounted`);
    this.renderPage();
  },

  beforeDestroy() {
    this.destroyPage(this.page);
  },

  render(h) {
    const {canvasAttrs: attrs} = this;
    return h('canvas', {attrs});
  },
};
</script>
<style>
.pdf-page {
  display: block;
  margin: 0 auto 0.5em;
}
</style>
