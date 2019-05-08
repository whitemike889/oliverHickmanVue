<template>
  <div class = "bar menuText">

    <div v-for="page in pages" class="navBar"
      v-bind:class="[page.classStyle, { navBarCurrent: page.classStyle == currentPage }]">
      <router-link class='menuText' v-bind:to="page.to">{{ page.label }}</router-link>
    </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
      pages: [
        {'classStyle': 'home-nav', 'to': '/', 'label': 'HOME'},
        {'classStyle': 'about', 'to': '/about', 'label': 'ABOUT'},
        {'classStyle': 'music', 'to': '/music', 'label': 'MUSIC'},
        {'classStyle': 'downloads', 'to': '/downloads', 'label': 'DOWNLOADS'},
        {'classStyle': 'contact', 'to': '/contact', 'label': 'CONTACT'},
      ],
      currentPage: '',
    }
  },

  mounted() {
    this.currentPage = this.$route.name;
  },

  watch: {
    '$route' (newRoute) {
      this.currentPage = (newRoute.name == 'home') ? 'home-nav' : newRoute.name;
    }
  }
}

</script>

<style>
.navBar {
  padding: 10px 8px 8px 8px;
  border-bottom: 3px solid #02552b;
}
.navBar:hover {
  border-bottom: 3px solid #fff;
}
.navBarCurrent {
  border-bottom: 3px solid #fff;
}
.navBar.menuText {
  padding-top: 2px;
}
a.menuText {
  padding-left: 4px;
}
.bar {
  background-color: #02552b;
  grid-row: nav;
  display: inline-grid;
  grid-template-columns: 0.5fr auto auto auto auto auto 0.5fr;
  grid-template-rows: auto;
  grid-column-gap: 2.25vw;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 30;
}
.home-nav {
  grid-row: 1;
  grid-column: 2;
}
.about {
  grid-row: 1;
  grid-column: 3;
}
.music {
  grid-row: 1;
  grid-column: 4;
}
.downloads {
  grid-row: 1;
  grid-column: 5;
}
.contact {
  grid-row: 1;
  grid-column: 6;
}
/* Padding for the sticky header */
.bar + .contentWrapper {
  padding-top: 42px;
}
</style>
