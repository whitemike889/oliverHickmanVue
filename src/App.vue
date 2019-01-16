<template>
  <div id="app">
    <navBar />
    <router-view />
  </div>
</template>

<script>
import navBar from "@/components/navBar.vue";

export default {
  components: {
    navBar
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,900");
@import url("https://fonts.googleapis.com/css?family=Arapey");

body {
  margin: 0px;
}

#app {
  display: grid;
  grid-template-columns: [col1] 1fr;
  grid-template-rows: [nav] auto [img1] 1fr [stuff] auto [img2] auto [footer] 0.25fr;
  background-color: #fff;
}
</style>
