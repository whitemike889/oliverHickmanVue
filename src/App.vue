<template>
  <div id="app">
    <navBar />
    <div class="contentWrapper">
      <router-view />
    </div>
    <Footer />
  </div>
</template>


<script>
import navBar from '@/components/navBar.vue';
import Footer from '@/components/footer.vue';

export default {
  components: {
    navBar,
    Footer,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,900");
@import url("https://fonts.googleapis.com/css?family=Arapey");

body {
  margin: 0px;
}
h1 {
  color: #02552b;
  font-size: 24px;
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 400;
  letter-spacing: 0.3em;
}
p {
  font-family: 'Arapey', serif;
  font-size: 20px;
  line-height: 30px;
}
a {
  text-decoration : none;
  color: #02552b;
}
a:visited {
  text-decoration: none;
}
.menuText {
  font-size: 18px;
  font-family: "Nunito Sans", sans-serif;
  font-weight: 400;
  color: #fff;
  letter-spacing: 0.2em;
  text-decoration: none;
}
#app {
  display: grid;
  grid-template-columns: [col1] 1fr;
  grid-template-rows: [nav] auto [img1] 1fr [stuff] auto [img2] auto [footer] 0.16fr;
  background-color: #fff;
}
</style>
